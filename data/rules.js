module.exports = {
  default: {
    ASSASSIN: 'The {% team %} team picked the assassin! They lose!',
    CIVILIAN: 'The {% team %} team picked a civilian. Their turn is now over!',
    FRIENDLY_SPY: 'The {% team %} team picked a friendly spy!',
    ENEMY_SPY: 'The {% team %} team picked an enemy spy! Their turn is now over'
  },
  drink: {
    ASSASSIN: '',
    CIVILIAN: '',
    FRIENDLY_SPY: '',
    ENEMY_SPY: ''
  },
  strip: {
    ASSASSIN: 'The {% team %} spymaster has to remove all of their clothes',
    CIVILIAN: 'The {% other_team %} spymaster should nominate a member of the {% team %} to remove one item of clothing',
    FRIENDLY_SPY: 'The {% team %} spymaster should nominate a member of the {% other_team %} team to remove one item of clothing',
    ENEMY_SPY: 'Everyone on the {% team %} team removes one item of clothing'
  }
};
