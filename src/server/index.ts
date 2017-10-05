import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as socketIo from 'socket.io';
import * as winston from 'winston';
import config from './config';
import { EventHandler } from './event-handler';
import api from './routes/api';
import { BaseEvent } from '../shared/events';
import { Game, GameOptions } from '../shared/game';
import { Games } from '../shared/games';
import { Rooms, RoomOptions } from '../shared/rooms';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const games = new Games();
const rooms = new Rooms();
const eventHandler = new EventHandler(games, rooms, io);

app.set('port', config.port);
app.use(cors());
app.use(bodyParser.json());
app.use(api(rooms, games));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(errorHandler());

server.listen(app.get('port'), () => {
  const url = `http://localhost:${app.get('port')}`;
  winston.info(`Codenames API server is running at ${url} in ${app.get('env')} mode`);

  io.on('connect', (socket: SocketIO.Socket) => {
    winston.info('Client connected');

    socket.on('message', (event: BaseEvent) => {
      eventHandler.handleEvent(event, socket);
    });

    socket.on('disconnect', () => {
      winston.info('Client disconnected');
    });
  });
});

module.exports = app;
