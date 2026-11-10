/** The only JSON-to-type cast in the codebase. */
export function readContent<T>(data: unknown): T {
  return data as T;
}
