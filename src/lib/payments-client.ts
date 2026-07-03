/**
 * Client-safe payment helpers. Do not import prisma or other server-only modules here.
 */
export const FREE_CHALLENGE_LIMIT = 35;
export const TOTAL_CHALLENGES = 152;
export const PRO_CHALLENGE_COUNT = TOTAL_CHALLENGES - FREE_CHALLENGE_LIMIT;

export function isPaywallEnabledClient(): boolean {
  return process.env.NEXT_PUBLIC_PAYWALL_ENABLED !== "false";
}