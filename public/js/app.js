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
    UPDATED: 'game'
  },
  REVEAL: 'reveal',
  HIGHLIGHT: 'highlight'
};

var ROLES = {
  CONTROLLER: 'controller',
  VIEWER: 'viewer'
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
    message: null,
    games: []
  },
  methods: {
    clearMessage: function() {
      socket.emit(EVENTS.MESSAGE.CLEAR);
    },
    createGame: function() {
      this.isController = true;
      this.isViewer = false;
      socket.emit(EVENTS.GAME.CREATE, MODES.UNDERCOVER, RULESETS.DEFAULT);
    },
    joinGame: function() {
      socket.emit(EVENTS.GAME.JOIN, 'ABCDEF', ROLES.VIEWER);
      this.isController = false;
      this.isViewer = true;
    },
    clickCell: function (x, y) {
      if (this.game.grid[y][x].highlighted) {
        socket.emit(EVENTS.REVEAL, { x: x, y: y });
      } else {
        socket.emit(EVENTS.HIGHLIGHT, { x: x, y: y });
      }
    }
  }
});

socket.on(EVENTS.GAME.LIST, function (games) {
  app.games = Object.keys(games);
});

socket.on(EVENTS.GAME.CREATED, function (tag) {
  socket.emit(EVENTS.GAME.JOIN, tag, ROLES.CONTROLLER)
});

socket.on(EVENTS.GAME.UPDATED, function (game) {
  app.game = game;
});

socket.on(EVENTS.MESSAGE.UPDATED, function (message) {
  app.message = message;
});
