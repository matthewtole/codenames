import { RulesetName } from '../lib/types';

// tslint:disable:max-line-length

export type Ruleset = { [key: string]: string };

const standard: Ruleset = {
  ASSASSIN: 'The {% team %} team just lost the game.',
  BYSTANDER: 'It is now the {% other_team %} team\'s turn.',
  FRIENDLY_SPY: 'Good job! Keep guessing.',
  ENEMY_SPY: 'Idiots! Your turn is now over.',
  VICTORY: 'Congratulations to the {% team %} team.',
};

const drinking: Ruleset = {
  ASSASSIN: 'The {% team %} spymaster has to down their drink.',
  BYSTANDER:
    'The {% other_team %} spymaster gets to nominate a member of the {% team %} team to take a drink.',
  FRIENDLY_SPY:
    'The {% team %} spymaster gets to nominate a member of the {% other_team %} team to take a drink.',
  ENEMY_SPY: 'Everyone on the {% team %} team has to take a drink.',
  VICTORY: 'Everyone on the {% other_team %} team has to take a drink.',
};

const strip: Ruleset = {
  ASSASSIN:
    'The {% team %} spymaster has to remove all their remaining clothes.',
  BYSTANDER:
    'The {% other_team %} spymaster gets to nominate a member of the {% team %} team to remove one item of clothing.',
  FRIENDLY_SPY:
    'The {% team %} spymaster gets to nominate a member of the {% other_team %} team to remove one item of clothing.',
  ENEMY_SPY:
    'Everyone on the {% team %} team has to remove one item of clothing.',
  VICTORY:
    'Everyone on the {% other_team %} team has to remove one item of clothing.',
};

export const Rulesets: { [key: string]: Ruleset } = {
  [RulesetName.STANDARD]: standard,
  [RulesetName.DRINKING]: drinking,
  [RulesetName.STRIP]: strip,
};
