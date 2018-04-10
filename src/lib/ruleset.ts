import { RulesetName } from '../redux/game/types';
import { BoardMode } from '../components/game/Board';

type RulesetSimple = { [key: string]: string };
type RulesetComplex = { [key: string]: { [key: string]: string } };

interface RulesetFileSimple {
  name: string;
  description?: string;
  isSimple: true;
  rules: RulesetSimple;
}

interface RulesetFileComplex {
  name: string;
  description?: string;
  isSimple: false;
  rules: RulesetComplex;
}

type RulesetFile = RulesetFileSimple | RulesetFileComplex;

export const RulesetNames = [
  RulesetName.STANDARD,
  RulesetName.DRINKING,
  RulesetName.STRIP,
];

const data: { [key: string]: RulesetFile } = {};
RulesetNames.forEach(name => {
  data[name] = require(`../data/ruleset/${name.toLowerCase()}.json`);
});

export class RulesetManager {
  static get(name: RulesetName, key: string, mode: BoardMode): string {
    const ruleset = data[name];
    if (ruleset.isSimple) {
      return ruleset.rules[key];
    }
    return ruleset.rules[key][mode];
  }

  static getName(ruleset: RulesetName): string {
    return data[ruleset].name;
  }

  static hasDescription(ruleset: RulesetName): boolean {
    return !!data[ruleset].description;
  }

  static getDescription(ruleset: RulesetName): string {
    return data[ruleset].description!;
  }
}
