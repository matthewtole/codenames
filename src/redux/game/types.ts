export interface Coordinate {
  row: number;
  col: number;
}

export interface GameOptions {
  rules: string;
  words: string;
}

export enum Role {
  RED_SPY = 'RED_SPY',
  BLUE_SPY = 'BLUE_SPY',
  BYSTANDER = 'BYSTANDER',
  ASSASSIN = 'ASSASSIN',
}

export interface Card {
  word: string;
  role: Role;
}

export enum Team {
  RED = 'RED',
  BLUE = 'BLUE',
}

export interface Message {
  header: string;
  content: string;
  team: Team;
}

export enum RulesetName {
  STANDARD = 'STANDARD',
  DRINKING = 'DRINKING',
  STRIP = 'STRIP',
}

export enum DictionaryName {
  ORIGINAL = 'ORIGINAL',
  UNDERCOVER = 'UNDERCOVER',
}