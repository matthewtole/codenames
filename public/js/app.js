'use strict';

require('../css/app.scss');
const Vue = require('vue');
const { EVENTS, MODES, RULESETS } = require('./enums');

const socket = io();

const app = new Vue({
  el: '#app',
  data: {
    state: 'choose-mode',
    isController: true,
    isViewer: false,
    game: null,
    gameTag: 'ABCDEF',
    wordList: MODES.ORIGINAL,
    ruleSet: RULESETS.DEFAULT,
    message: null,
    games: [],
    rulesets: Object.keys(RULESETS).map((set) => RULESETS[set]),
    modes: Object.keys(MODES).map((mode) => MODES[mode])
  },
  methods: {
    setMode(mode) {
      this.isController = mode === 'controller';
      this.isViewer = mode === 'viewer';
      this.state = 'create-join';
    },
    gotoCreateGame() {
      this.state = 'create';
    },
    gotoJoinGame() {
      this.state = 'join';
    },
    clearMessage() {
      socket.emit(EVENTS.MESSAGE.CLEAR);
    },
    createGame(event) {
      event.preventDefault();
      this.state = 'game';
      socket.emit(EVENTS.GAME.CREATE, this.wordList, this.ruleSet);
    },
    joinGame(event) {
      event.preventDefault();
      socket.emit(EVENTS.GAME.JOIN, this.gameTag);
      this.state = 'game';

    },
    clickCell(x, y) {
      const cell = this.game.grid[y][x];
      const event = cell.highlighted ? EVENTS.REVEAL : EVENTS.HIGHLIGHT;
      this.clearMessage();
      socket.emit(event, { x: x, y: y });
    },
    endTurn() {
      this.clearMessage();
      socket.emit(EVENTS.TURN.END);
    },
    newRound() {
      socket.emit(EVENTS.GAME.NEW_ROUND, this.wordList, this.ruleSet);
    }
  }
});

socket.on(EVENTS.GAME.LIST, (games) => {
  app.games = Object.keys(games);
});

socket.on(EVENTS.GAME.CREATED, (tag) => {
  socket.emit(EVENTS.GAME.JOIN, tag);
});

socket.on(EVENTS.GAME.UPDATED, (game) => {
  app.game = game;
});

socket.on(EVENTS.MESSAGE.UPDATED, (message) => {
  app.message = message;
});
