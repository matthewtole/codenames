import { DictionaryName } from '../redux/game/types';

type Dictionary = string[];
interface DictionaryFile {
  name: string;
  description?: string;
  words: Dictionary;
}

export const DictionaryNames = [
  DictionaryName.ORIGINAL,
  DictionaryName.UNDERCOVER,
  DictionaryName.DUET,
];

const data: { [key: string]: DictionaryFile } = {};
DictionaryNames.forEach(name => {
  data[name] = require(`../data/dictionary/${name.toLowerCase()}.json`);
});

export class DictionaryManager {
  static get(dictionary: DictionaryName): Dictionary {
    return data[dictionary].words;
  }

  static getName(dictionary: DictionaryName): string {
    return data[dictionary].name;
  }

  static hasDescription(dictionary: DictionaryName): boolean {
    return !!data[dictionary].description;
  }

  static getDescription(dictionary: DictionaryName): string {
    return data[dictionary].description!;
  }

  static getRandomWords(dictionary: DictionaryName, count: number): Dictionary {
    const words = [];
    const list = DictionaryManager.get(dictionary);
    for (let w = 0; w < Math.min(count, list.length); w += 1) {
      let word: string | undefined;
      while (word === undefined || words.indexOf(word) >= 0) {
        const index = Math.floor(Math.random() * list.length);
        word = list[index];
      }
      words.push(word);
    }
    return words;
  }
}
