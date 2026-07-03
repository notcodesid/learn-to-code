import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
} from "@solana/pay";

/**
 * Solana Pay configuration.
 *
 * Devnet by default; flip via env:
 *   SOLANA_NETWORK=mainnet-beta
 *   SOLANA_RPC_URL=https://...           // optional override
 *   SOLANA_RECIPIENT=<base58 pubkey>     // your treasury wallet
 *   SOLANA_USDC_MINT=<base58 mint>       // optional; defaults below
 */

// Devnet USDC mint (Circle's official USDC-Dev).
const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
// Mainnet USDC mint (Circle's official).
const MAINNET_USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export function getSolanaNetwork(): "mainnet-beta" | "devnet" {
  return process.env.SOLANA_NETWORK === "mainnet-beta" ? "mainnet-beta" : "devnet";
}

export function getSolanaConnection(): Connection {
  const network = getSolanaNetwork();
  const url = process.env.SOLANA_RPC_URL || clusterApiUrl(network);
  return new Connection(url, "confirmed");
}

export function getRecipient(): PublicKey {
  const addr = process.env.SOLANA_RECIPIENT;
  if (!addr) {
    throw new Error(
      "SOLANA_RECIPIENT is not configured. Set it to your treasury wallet's base58 address."
    );
  }
  return new PublicKey(addr);
}

export function getUsdcMint(): PublicKey {
  const env = process.env.SOLANA_USDC_MINT;
  if (env) return new PublicKey(env);
  return new PublicKey(
    getSolanaNetwork() === "mainnet-beta" ? MAINNET_USDC_MINT : DEVNET_USDC_MINT
  );
}

/** Generates a fresh, single-use reference key used to identify the payment. */
export function newReference(): PublicKey {
  return Keypair.generate().publicKey;
}

/** Builds a Solana Pay transfer URL for 1 USDC. */
export function buildSolanaPayUrl(reference: PublicKey, label: string, memo: string) {
  return encodeURL({
    recipient: getRecipient() as any, // Type assertion for @solana/pay compatibility
    amount: 1, // USDC has 6 decimals, so 1 = 1 USDC
    splToken: getUsdcMint() as any,
    reference: [reference] as any,
    label,
    message: memo,
    memo,
  });
}

/**
 * Looks up a payment by its reference key.
 *
 * Returns:
 *  - `{ confirmed: true, signature }` once a transaction matching the reference
 *    is found AND validated to be a 1 USDC transfer to our recipient.
 *  - `{ confirmed: false }` while still waiting.
 *
 * Throws on validation errors (wrong amount, wrong recipient, etc.) so the
 * caller can fail loudly.
 */
export async function findAndValidate(reference: PublicKey): Promise<
  | { confirmed: false }
  | { confirmed: true; signature: string }
> {
  const connection = getSolanaConnection();
  let signatureInfo;
  try {
    signatureInfo = await findReference(connection as any, reference as any);
  } catch (err) {
    if (err instanceof FindReferenceError) return { confirmed: false };
    throw err;
  }

  // Validate the transaction matches what we asked for.
  await validateTransfer(
    connection as any,
    signatureInfo.signature,
    {
      recipient: getRecipient() as any,
      amount: 1, // 1 USDC
      splToken: getUsdcMint() as any,
      reference: [reference] as any,
    },
    { commitment: "confirmed" }
  );

  return { confirmed: true, signature: signatureInfo.signature };
}
