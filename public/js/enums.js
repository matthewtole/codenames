'use strict';

module.exports = {
  EVENTS: {
    MESSAGE: {
      CLEAR: 'message.clear',
      UPDATED: 'message'
    },
    GAME: {
      CREATE: 'create',
      JOIN: 'join',
      LIST: 'game.list',
      CREATED: 'game.created',
      UPDATED: 'game',
      NEW_ROUND: 'new_round'
    },
    TURN: {
      END: 'turn.end'
    },
    REVEAL: 'reveal',
    HIGHLIGHT: 'highlight'
  },
  MODES: {
    ORIGINAL: 'original',
    UNDERCOVER: 'undercover'
  },
  RULESETS: {
    DEFAULT: 'default',
    DRINKING: 'drinking',
    STRIP: 'strip'
  }
};
