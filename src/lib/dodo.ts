import DodoPayments from "dodopayments";

/**
 * Lazily-initialised Dodo Payments client. We avoid throwing at module load
 * so missing env vars only break payment routes, not the whole app.
 */
let _client: DodoPayments | null = null;
export function getDodoClient(): DodoPayments {
  if (_client) return _client;
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  if (!apiKey) {
    throw new Error("DODO_PAYMENTS_API_KEY is not configured");
  }
  _client = new DodoPayments({
    bearerToken: apiKey,
    environment:
      process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
        ? "live_mode"
        : "test_mode",
  });
  return _client;
}

/** Map of currency to product ID configured in the Dodo dashboard. */
export function getDodoProductId(currency: "USD" | "INR" = "USD"): string {
  const id =
    currency === "INR"
      ? process.env.DODO_PRODUCT_ID_INR
      : process.env.DODO_PRODUCT_ID_USD;
  if (!id) {
    throw new Error(
      `DODO_PRODUCT_ID_${currency} is not configured. Create the product in the Dodo dashboard first.`
    );
  }
  return id;
}
