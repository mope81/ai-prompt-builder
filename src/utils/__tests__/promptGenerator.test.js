import { describe, expect, test } from '@jest/globals';
import { generatePrompt, vocabularyLibrary } from '../promptGenerator';

describe('Prompt Generator', () => {
  // 测试词库完整性
  test('vocabulary library should have all required categories', () => {
    const requiredCategories = ['subject', 'style', 'lighting', 'camera', 'mood'];
    requiredCategories.forEach(category => {
      expect(vocabularyLibrary).toHaveProperty(category);
      expect(vocabularyLibrary[category].values).toBeDefined();
      expect(vocabularyLibrary[category].values.length).toBeGreaterThan(0);
    });
  });

  // 测试生成函数
  test('generatePrompt should replace all variables', () => {
    const template = 'Create {subject} in {style} with {lighting} using {camera} to capture {mood} atmosphere';
    const result = generatePrompt(template);
    expect(result).not.toContain('{');
    expect(result).not.toContain('}');
  });

  // 测试错误处理
  test('generatePrompt should throw error for invalid variable', () => {
    const template = 'Create {invalid} prompt';
    expect(() => generatePrompt(template)).toThrow();
  });

  // 测试空值处理
  test('generatePrompt should throw error for empty template', () => {
    expect(() => generatePrompt('')).toThrow();
    expect(() => generatePrompt('   ')).toThrow();
  });

  // 测试每个类别的值数量
  test('each category should have minimum required values', () => {
    const minValues = {
      subject: 48,  // 12 + 9 + 9 + 9 + 9
      style: 43,    // 11 + 8 + 8 + 8 + 8
      lighting: 32, // 8 + 8 + 8 + 8
      camera: 28,   // 6 + 6 + 8 + 8
      mood: 32      // 8 + 8 + 8 + 8
    };

    Object.entries(minValues).forEach(([category, minCount]) => {
      const actualCount = vocabularyLibrary[category].values.length;
      expect(actualCount).toBeGreaterThanOrEqual(
        minCount,
        `${category} should have at least ${minCount} values, but has ${actualCount}`
      );
    });
  });

  // 测试词库内容的格式
  test('all values should be non-empty strings', () => {
    Object.entries(vocabularyLibrary).forEach(([category, { values }]) => {
      values.forEach((value, index) => {
        expect(typeof value).toBe(
          'string',
          `Value at index ${index} in ${category} should be a string, but got ${typeof value}`
        );
        expect(value.trim()).not.toBe(
          '',
          `Value at index ${index} in ${category} should not be empty`
        );
      });
    });
  });

  // 测试词库中的重复值
  test('no duplicate values in categories', () => {
    Object.entries(vocabularyLibrary).forEach(([category, { values }]) => {
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(
        values.length,
        `Found duplicate values in ${category} category`
      );
    });
  });
});
