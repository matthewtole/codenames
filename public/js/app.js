'use strict';

require('../css/app.scss');
const Vue = require('vue');
const store = require('store');
const { EVENTS, MODES, RULESETS } = require('./enums');
const queryString = require('query-string');
const capitalize = require('capitalize');
require('./components');

const socket = io();

const STATES = {
  modeChoice: 0,
  createJoin: 1,
  create: 2,
  creating: 3,
  join: 4,
  joining: 5,
  game: 6,
};

const app = new Vue({
  el: '#app',
  data: {
    state: STATES.modeChoice,
    isController: store.get('mode') === 'controller',
    isViewer: store.get('mode') === 'viewer',
    game: null,
    gameTag: store.get('game-tag'),
    wordList: MODES.ORIGINAL,
    ruleSet: RULESETS.DEFAULT,
    message: null,
    rulesets: Object.keys(RULESETS).map((set) => RULESETS[set]),
    modes: Object.keys(MODES).map((mode) => MODES[mode]),
    menuVisible: false,
    states: STATES
  },
  filters: {
    capitalize
  },
  methods: {
    resetData() {
      this.state = STATES.modeChoice;
      this.isController = false;
      this.isViewer = false;
      this.game = null;
      this.gameTag = null;
      this.message = null;
      this.wordList = MODES.ORIGINAL;
      this.ruleSet = RULESETS.DEFAULT;
      this.menuVisible = false;
    },
    init() {
      const query = queryString.parse(location.search);
      if (query.room) {
        this.gameTag = query.room;
      }
      if (query.mode) {
        this.isController = query.mode === 'controller';
        this.isViewer = query.mode === 'viewer';
      }
      if (this.gameTag && (this.isController || this.isViewer)) {
        socket.emit('room.join', this.gameTag);
        this.state = STATES.game;
        store.set('game-tag', this.gameTag);
      }
    },
    setMode(mode) {
      this.isController = mode === 'controller';
      this.isViewer = mode === 'viewer';
      this.state = STATES.createJoin;
      store.set('mode', mode);
    },
    gotoCreateGame() {
      this.state = STATES.create;
    },
    gotoJoinGame() {
      this.state = STATES.join;
    },
    clearMessage() {
      socket.emit(EVENTS.MESSAGE.CLEAR);
    },
    createGame(event) {
      event.preventDefault();
      this.state = STATES.game;
      socket.emit('room.create', this.wordList, this.ruleSet);
    },
    joinGame(event) {
      if (event) { event.preventDefault(); }
      socket.emit('room.join', this.gameTag);
      this.state = STATES.game;
      store.set('game-tag', this.gameTag);
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
      this.hideMenu();
    },
    reset() {
      store.clear();
      this.resetData();
    },
    showMenu() {
      this.menuVisible = true;
    },
    hideMenu() {
      this.menuVisible = false;
    },
    goBack() {
      switch (this.state) {
        case STATES.createJoin:
          this.state = STATES.modeChoice;
          break;
        case STATES.create:
        case STATES.join:
          this.state = STATES.createJoin;
          break;
      }
    }
  }
});

app.init();

socket.on(EVENTS.GAME.CREATED, (tag) => {
  store.set('game-tag', tag);
  socket.emit('room.join', tag);
  app.gameTag = tag;
  app.showMenu();
});

socket.on(EVENTS.GAME.UPDATED, (game) => {
  app.game = game;
});

socket.on(EVENTS.MESSAGE.UPDATED, (message) => {
  app.message = message;
});

socket.on('room.error', () => {
  app.game = null;
  app.gameTag = null;
  store.clear();
  window.location.reload();
});
