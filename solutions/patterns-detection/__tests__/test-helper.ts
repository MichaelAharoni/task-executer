export const VALID_PATTERNS = [
  { FIRST_STRING: 'qaq', SECOND_STRING: 'cdc', PATTERN: '010' },
  { FIRST_STRING: 'abba', SECOND_STRING: 'cddc', PATTERN: '0110' },
  { FIRST_STRING: 'aaaa', SECOND_STRING: 'bbbb', PATTERN: '0000' },
  { FIRST_STRING: 'abcabc', SECOND_STRING: 'defdef', PATTERN: '012012' },
  { FIRST_STRING: 'aabb', SECOND_STRING: 'bbcc', PATTERN: '0011' },
  { FIRST_STRING: 'abc', SECOND_STRING: 'lsv', PATTERN: '012' },
  { FIRST_STRING: '', SECOND_STRING: '', PATTERN: '' },
  { FIRST_STRING: 'a', SECOND_STRING: 'b', PATTERN: '0' },
  { FIRST_STRING: 'aaac', SECOND_STRING: 'bbbe', PATTERN: '0001' },
  { FIRST_STRING: 'xyzxyzabc', SECOND_STRING: 'abcabcdef', PATTERN: '012012345' },
];

export const INVALID_PATTERNS = [
  { FIRST_STRING: 'abba', SECOND_STRING: 'abcd' },
  { FIRST_STRING: 'aabb', SECOND_STRING: 'aabc' },
  { FIRST_STRING: 'abc', SECOND_STRING: 'aaa' },
  { FIRST_STRING: 'abababab', SECOND_STRING: 'lllaaaala' },
  { FIRST_STRING: 'abcabcabc', SECOND_STRING: 'abc' },
  { FIRST_STRING: 'aabbaabb', SECOND_STRING: 'aavvaadd' },
];
