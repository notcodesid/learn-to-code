export async function parseApiJson<T = Record<string, unknown>>(
  res: Response
): Promise<T> {
  const text = await res.text();

  if (!text.trim()) {
    throw new Error(
      `Empty response from server (${res.status}). Try restarting the dev server.`
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
  }
}