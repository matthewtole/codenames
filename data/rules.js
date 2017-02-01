'use strict';

/* eslint-disable max-len */

module.exports = {
  default: {
    ASSASSIN: 'The {% team %} team picked the assassin! They lose!',
    CIVILIAN: 'The {% team %} team picked a civilian. Their turn is now over!',
    FRIENDLY_SPY: 'The {% team %} team picked a friendly spy!',
    ENEMY_SPY: 'The {% team %} team picked an enemy spy! Their turn is now over'
  },
  drinking: {
    ASSASSIN: 'The {% team %} spymaster downs their drink',
    CIVILIAN: 'The {% other_team %} spymaster nominates a member of the {% team %} team to take a drink',
    FRIENDLY_SPY: 'The {% team %} spymaster nominates a member of the {% other_team %} team to take a drink',
    ENEMY_SPY: 'Everyone on the {% team %} team takes a drink'
  },
  strip: {
    ASSASSIN: 'The {% team %} spymaster removes all their remaining clothes',
    CIVILIAN: 'The {% other_team %} spymaster nominates a member of the {% team %} to remove one item of clothing',
    FRIENDLY_SPY: 'The {% team %} spymaster nominates a member of the {% other_team %} team to remove one item of clothing',
    ENEMY_SPY: 'Everyone on the {% team %} team removes one item of clothing'
  }
};

/* eslint-enable max-len */
