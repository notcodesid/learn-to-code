/**
 * Client-safe payment helpers. Do not import prisma or other server-only modules here.
 */
export function isPaywallEnabledClient(): boolean {
  return process.env.NEXT_PUBLIC_PAYWALL_ENABLED !== "false";
}