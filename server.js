'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');
const RoomManager = require('./lib/room-manager');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const capitalize = require('capitalize');

app.use(express.static('public'));
app.use(express.static('dist'));
app.set('view engine', 'html');
app.engine('html', hbs.__express); // eslint-disable-line no-underscore-dangle

hbsutils.registerPartials(`${__dirname}/views/partials`);
hbsutils.registerWatchedPartials(`${__dirname}/views/partials`);
hbs.localsAsTemplateData(app);
hbs.registerHelper('capitalize', capitalize);

const roomManager = new RoomManager();
roomManager.load();

app.locals.roomManager = roomManager;

app.use('/admin', require('./routes/admin'));

app.get('/:tag/:mode', (req, res) => {
  res.redirect(`/?room=${req.params.tag}&mode=${req.params.mode}`);
});

io.on('connection', (socket) => {
  socket.on('room.create', (wordList, ruleSet) => {
    const room = roomManager.createRoom({ wordList, ruleSet });
    room.startGame();
    socket.emit('game.created', room.tag);
  });

  socket.on('room.join', (roomTag) => {
    const room = roomManager.getRoom(roomTag);
    if (!room) {
      socket.emit('room.error');
      return;
    }
    room.attachSocket(socket);
    socket.roomTag = roomTag;
  });
});

http.listen(config.port, () => {
  console.log(`Codenames server running at http://localhost:${config.port}`);
});
