var socket = io();

var EVENTS = {
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
};

var MODES = {
  ORIGINAL: 'original',
  UNDERCOVER: 'undercover'
};

var RULESETS = {
  DEFAULT: 'default',
  DRINKING: 'drinking',
  STRIP: 'strip'
};

var app = new Vue({
  el: '#app',
  data: {
    isController: true,
    isViewer: false,
    game: null,
    gameTag: 'ABCDEF',
    wordList: MODES.ORIGINAL,
    ruleSet: RULESETS.DEFAULT,
    message: null,
    games: [],
    rulesets: Object.keys(RULESETS).map(function (set) { return RULESETS[set]; }),
    modes: Object.keys(MODES).map(function (mode) { return MODES[mode]; })
  },
  methods: {
    clearMessage: function() {
      socket.emit(EVENTS.MESSAGE.CLEAR);
    },
    createGame: function(event) {
      event.preventDefault();
      this.isController = true;
      this.isViewer = false;
      socket.emit(EVENTS.GAME.CREATE, this.wordList, this.ruleSet);
    },
    joinGame: function(event) {
      event.preventDefault();
      socket.emit(EVENTS.GAME.JOIN, this.gameTag);
      this.isController = false;
      this.isViewer = true;

    },
    clickCell: function(x, y) {
      const cell = this.game.grid[y][x];
      const event = cell.highlighted ? EVENTS.REVEAL : EVENTS.HIGHLIGHT;
      socket.emit(event, { x: x, y: y });
    },
    endTurn: function() {
      socket.emit(EVENTS.TURN.END);
    },
    newRound: function() {
      socket.emit(EVENTS.GAME.NEW_ROUND)
    }
  }
});

socket.on(EVENTS.GAME.LIST, function(games) {
  app.games = Object.keys(games);
});

socket.on(EVENTS.GAME.CREATED, function(tag) {
  socket.emit(EVENTS.GAME.JOIN, tag);
});

socket.on(EVENTS.GAME.UPDATED, function(game) {
  app.game = game;
});

socket.on(EVENTS.MESSAGE.UPDATED, function(message) {
  app.message = message;
});
