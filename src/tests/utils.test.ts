import { truncateText } from '../utils/utils';

describe('truncateText', () => {
  it('should return the original text if it is shorter than maxLength', () => {
    const text = 'Short text';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('should return the original text if it is exactly maxLength', () => {
    const text = 'Exactly 20 chars!!';
    expect(truncateText(text, 20)).toBe(text);
  });

  it('should truncate text longer than maxLength and add "..."', () => {
    const text = 'This is a long sentence that should be truncated';
    expect(truncateText(text, 20)).toMatch("This is a long that...");
  });

  it('should not cut words in half when truncating', () => {
    const text = 'Hello world!';
    expect(truncateText(text, 6)).toBe('Hello...');
  });

  it('should handle empty strings correctly', () => {
    expect(truncateText('', 10)).toBe('');
  });
});
