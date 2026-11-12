/** Lowercase id with spaces as dashes. `Our Products` becomes `our-products`. */
export function toId(text: string) {
  return text.toLowerCase().replaceAll(" ", "-");
}
