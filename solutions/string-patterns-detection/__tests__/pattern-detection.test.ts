import { validatePattern } from '../pattern-detection';
import { VALID_PATTERNS, INVALID_PATTERNS } from './test-helper';

describe('Pattern Detection', () => {
  describe('Valid Patterns', () => {
    it('should correctly validate matching patterns', () => {
      VALID_PATTERNS.forEach((testCase) => {
        const { FIRST_STRING, SECOND_STRING, PATTERN } = testCase;
        const { isPatternMatch, pattern } = validatePattern(FIRST_STRING, SECOND_STRING);

        expect(isPatternMatch).toBe(true);
        expect(pattern).toBe(PATTERN);
      });
    });
  });

  describe('Invalid Patterns', () => {
    it('should correctly identify strings with different patterns', () => {
      INVALID_PATTERNS.forEach(({ FIRST_STRING, SECOND_STRING }) => {
        const { isPatternMatch } = validatePattern(FIRST_STRING, SECOND_STRING);

        expect(isPatternMatch).toBe(false);
      });
    });
  });
});
