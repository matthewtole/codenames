import { DictionaryManager, DictionaryNames } from './dictionary';
import { DictionaryName } from '../redux/game/types';

describe('DictionaryManager', () => {
  describe('#get', () => {
    it('should return an array of strings', () => {
      const words = DictionaryManager.get(DictionaryName.ORIGINAL);
      expect(words).toBeInstanceOf(Array);
      expect(words.length).toBeGreaterThan(0);
    });

    it('should return a valid dictionary for each name', () => {
      DictionaryNames.forEach(name =>
        expect(DictionaryManager.get(name)).not.toBeUndefined()
      );
    });
  });

  describe('#getName', () => {
    it('returns the name of a dictionary', () => {
      expect(DictionaryManager.getName(DictionaryName.ORIGINAL)).toBe(
        'Original'
      );
    });
  });

  describe('#hasDescription', () => {
    it('returns true if the dictionary has a description', () => {
      expect(
        DictionaryManager.hasDescription(DictionaryName.UNDERCOVER)
      ).toBeTruthy();
    });

    it('returns false if the dictionar does not have a description', () => {
      expect(
        DictionaryManager.hasDescription(DictionaryName.ORIGINAL)
      ).toBeFalsy();
    });
  });

  describe('#getDescription', () => {
    it('returns the dictionary description if it has one', () => {
      expect(
        DictionaryManager.getDescription(DictionaryName.UNDERCOVER)
      ).not.toBeUndefined();
    });

    it('returns undefined if the dictionary does not have a description', () => {
      expect(
        DictionaryManager.getDescription(DictionaryName.ORIGINAL)
      ).toBeUndefined();
    });
  });

  describe('#getRandomWords', () => {
    it('returns an array of words from a dictionary', () => {
      const words = DictionaryManager.getRandomWords(DictionaryName.DUET, 10);
      expect(words).toHaveLength(10);
      words.forEach(word =>
        expect(DictionaryManager.get(DictionaryName.DUET)).toContain(word)
      );
    });

    it('contains no duplicate words', () => {
      let words = DictionaryManager.getRandomWords(DictionaryName.DUET, 50);
      while (words.length) {
        const word = words.pop();
        expect(words).not.toContain(word);
      }
    });
  });
});
