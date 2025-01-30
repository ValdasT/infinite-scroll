/**
 * Truncates a text string to the specified length while preserving whole words.
 * @param text - The text to truncate.
 * @param maxLength - The maximum allowed length.
 * @returns The truncated text with "..." if needed.
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
  
    return text
      .split(' ')
      .reduce((acc, word) => {
        const newLength = acc.length + (acc ? 1 : 0) + word.length;
        return newLength > maxLength ? acc : `${acc} ${word}`.trim();
      }, '')
      .concat('...');
  };