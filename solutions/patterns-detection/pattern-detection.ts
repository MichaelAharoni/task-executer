const buildCharToNumberMaps = (str: string) => {
  let uniqueChars = 0;
  const charToNumberMap: Record<string, number> = {}; // {a: 0, b: 1, c: 2, ...} by appearance order

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charToNumberMap[char] === undefined) {
      charToNumberMap[char] = uniqueChars;

      uniqueChars++;
    }
  }

  return charToNumberMap;
};

export const validatePattern = (str1: string, str2: string) => {
  const firstCharMap = buildCharToNumberMaps(str1);
  const secondCharMap = buildCharToNumberMaps(str2);

  const firstPattern = str1.split('').reduce((acc, char) => acc + firstCharMap[char], '');
  const secondPattern = str2.split('').reduce((acc, char) => acc + secondCharMap[char], '');

  const isPatternMatch = firstPattern === secondPattern;
  return { isPatternMatch, pattern: firstPattern };
};
