/**
 * Maps characters to sequential binary values
 */
const buildBinaryMap = (str: string) => {
  const charToBinaryMap: Record<string, string> = {};
  const uniqueChars = Array.from(new Set(str.split('')));

  uniqueChars.forEach((char, index) => {
    // Convert index to binary string and remove leading '0b'
    // 0 -> "0", 1 -> "1", 2 -> "10", 3 -> "11", 4 -> "100", etc.
    charToBinaryMap[char] = index.toString(2);
  });

  return charToBinaryMap;
};

/**
 * Creates a comma-separated binary pattern from a string
 */
const createPattern = (str: string, charToBinaryMap: Record<string, string>) => {
  if (str.length === 0) return '';

  // Generate comma-separated binary pattern
  return str
    .split('')
    .map((char) => charToBinaryMap[char])
    .join(',');
};

export const validatePattern = (str1: string, str2: string) => {
  // Handle empty strings case
  if (str1.length === 0 && str2.length === 0) {
    return { isPatternMatch: true, pattern: '' };
  }

  if (str1.length !== str2.length) {
    return { isPatternMatch: false, pattern: '' };
  }

  const firstCharBinaryMap = buildBinaryMap(str1);
  const secondCharBinaryMap = buildBinaryMap(str2);

  const firstPattern = createPattern(str1, firstCharBinaryMap);
  const secondPattern = createPattern(str2, secondCharBinaryMap);

  const isPatternMatch = firstPattern === secondPattern;
  return { isPatternMatch, pattern: firstPattern };
};
