/**
 * Capitalizes the first letter of a single word.
 * @param text - The text to capitalize.
 * @returns The capitalized word.
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each word in a sentence.
 * @param sentence - The sentence to transform.
 * @returns The sentence with each word capitalized.
 */
export function capitalizeWords(sentence: string): string {
  if (!sentence) return "";
  return sentence
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}
