var socket = io();

var app = new Vue({
  el: '#app',
  data: {
    isController: true,
    isViewer: false,
    game: null,
    message: null
  },
  methods: {
    clearMessage: function() {
      this.message = null
    },
    createGame: function() {
      this.isController = true;
      this.isViewer = false;
      socket.emit('create', 'original');
    },
    joinGame: function() {
      socket.emit('join', 'ABCDEF');
      this.isController = false;
      this.isViewer = true;
    },
    clickCell: function (x, y) {
      if (this.game.grid[y][x].highlighted) {
        socket.emit('reveal', { x: x, y: y });
      } else {
        socket.emit('highlight', { x: x, y: y });
      }
      /*const cell = {
        x: event.target.attr['data-game-x'],
        y: event.target.attr['data-game-y']
      }
      console.log(cell);*/
    }
  }
});

// socket.emit('create', 'original');

socket.on('game', function (game) {
  app.game = game;
});

socket.on('message', function (message) {
  app.message = message;
});

/*socket.on('game', function (game) {
  $('#game-board').text('');
  game.grid.forEach(function (row, y) {
    const $row = $('<div/>').addClass('board__row');
    row.forEach(function (cell, x) {
      const $cell = $('<div/>').addClass('board__cell').data('grid-y', y).data('grid-x', x).append($('<div/>').text(cell.word));
      if (cell.revealed) {
        $cell.addClass('spy--' + cell.color);
      }
      $cell.on('click', function () {
        socket.emit('reveal', {
          x: $(this).data('grid-x'),
          y: $(this).data('grid-y')
        });
      });
      $row.append($cell);
    });
    $('#game-board').append($row);
  })
});*/

/*
var socket = io();
socket.on('game', function (game) {
  console.log(game);

});

socket.on('message', function (message) {
  $('#game-messages').text(message);
})
*/
