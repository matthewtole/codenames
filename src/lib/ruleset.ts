import { RulesetName } from '../redux/game/types';

type Ruleset = { [key: string]: string };
interface RulesetFile {
  name: string;
  description?: string;
  rules: Ruleset;
}

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
  static get(ruleset: RulesetName, key: string): string {
    return data[ruleset].rules[key];
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
