/**
 * Payment gating configuration and helpers.
 *
 * Free tier: first FREE_CHALLENGE_LIMIT challenges (sorted by `order` asc, then `id` asc).
 * Paid users (`hasPaid=true`) get access to all challenges.
 *
 * Server-only — import from @/lib/payments-client in client components.
 */
import "server-only";
import { prisma } from "./prisma";

export const FREE_CHALLENGE_LIMIT = 35;

export const PRICE_USD = 1;
export const PRICE_INR = 85;

/**
 * Returns the set of challenge IDs that are free for everyone.
 * Result is cached per-process (challenges are static).
 */
let _freeIdsCache: Set<number> | null = null;
export async function getFreeChallengeIds(): Promise<Set<number>> {
  if (_freeIdsCache) return _freeIdsCache;
  const free = await prisma.challenge.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
    take: FREE_CHALLENGE_LIMIT,
    select: { id: true },
  });
  _freeIdsCache = new Set(free.map((c) => c.id));
  return _freeIdsCache;
}

/** Bust the cache after seed/admin updates. */
export function invalidateFreeChallengeCache() {
  _freeIdsCache = null;
}

/**
 * True if `userId` may access `challengeId`.
 * - Free challenges: always allowed (even for unauthenticated users).
 * - Paid challenges: only if user exists and `hasPaid=true`.
 */
export async function canAccessChallenge(
  userId: string | null | undefined,
  challengeId: number
): Promise<boolean> {
  if (!isPaywallEnabled()) return true;

  const freeIds = await getFreeChallengeIds();
  if (freeIds.has(challengeId)) return true;
  if (!userId) return false;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { hasPaid: true },
  });
  return !!user?.hasPaid;
}

/** Mark a user as paid (idempotent). */
export async function markUserPaid(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { hasPaid: true, paidAt: new Date() },
  });
}

/**
 * Returns true if the paywall is currently active.
 * Set PAYWALL_ENABLED=false in environment to disable all payment gating
 * (useful for reviews, demos, or launches where you want the UI visible
 * but no actual payment required).
 */
export function isPaywallEnabled(): boolean {
  return process.env.PAYWALL_ENABLED !== "false";
}
