/**
 * @param {string} a
 * @param {string} b
 */
export function string_compare(a, b) {
  let index = 0;
  for (const char_a of a) {
    if (char_a.toLowerCase() > b[index].toLowerCase()) return 1;
    if (char_a.toLowerCase() < b[index].toLowerCase()) return -1;
    index += 1;
    if (!b[index]) return 1;
  }
  return a.length - b.length;
}
