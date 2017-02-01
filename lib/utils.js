'use strict';

const Game = require('./game');
const Rules = require('../data/rules');

module.exports.generateGameTag = () => 'ABCDEF';

module.exports.getRule = (event, team, ruleSet) => {
  let rule = Rules[ruleSet][event];
  rule = rule.replace('{% team %}', team);
  rule = rule.replace('{% other_team %}', team === Game.RED ? Game.BLUE : Game.RED);
  return rule;
};

module.exports.emitAll = (game, event, data) => {
  game.sockets.forEach((socket) => {
    socket.emit(event, data);
  });
};
