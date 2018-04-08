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
}
