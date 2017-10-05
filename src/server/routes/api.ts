import * as cors from 'cors';
import { Router, Request, Response, ErrorRequestHandler } from 'express';
import { Game, GameOptions } from '../../shared/game';
import { Games } from '../../shared/games';
import { Rooms, RoomOptions } from '../../shared/rooms';

export default (rooms: Rooms, games: Games): Router => {
  const router: Router = Router();

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(400).json({
      error: err.message,
    });
  };

  router.get('/api/v1/room', (req, res) => {
    res.json({
      rooms: rooms.rooms,
    });
  });

  router.options('/api/v1/room', cors());
  router.post('/api/v1/room', (req, res) => {
    const room = rooms.createRoom(req.body.options as RoomOptions);
    if (req.body.createGame) {
      const game = games.createGame(room.tag, { words: room.words, rules: room.rules });
      room.gameId = game.id;
    }
    res.json(room);
  });

  router.get('/api/v1/room/:tag', (req, res, next) => {
    const room = rooms.getRoom(req.params.tag);
    if (room === undefined) {
      return next(new Error(`Cannot find room with tag ${req.params.tag}`));
    }
    res.json(room);
  });

  router.post('/api/v1/room/:tag/game', (req, res, next) => {
    const room = rooms.getRoom(req.params.tag);
    if (room === undefined) {
      return next(new Error(`Cannot find room with tag ${req.params.tag}`));
    }
    const game = games.createGame(room.tag, req.body as GameOptions);
    room.gameId = game.id;
    res.json({
      game: game.state,
    });
  });

  router.get('/api/v1/room/:tag/game', (req, res, next) => {
    const room = rooms.getRoom(req.params.tag);
    if (room === undefined) {
      return next(new Error(`Cannot find room with tag ${req.params.tag}`));
    }
    if (room.gameId === undefined) {
      return next(new Error(`The room has no active game!`));
    }
    const game = games.findById(room.gameId);
    res.json({
      game: game.state,
    });
  });

  router.post('/api/v1/room/:tag/game/highlight/:col/:row', (req: Request, res: Response, next) => {
    const room = rooms.getRoom(req.params.tag);
    if (room === undefined) {
      return next(new Error(`Cannot find room with tag ${req.params.tag}`));
    }
    if (room.gameId === undefined) {
      return next(new Error(`The room has no active game!`));
    }
    const game = games.findById(room.gameId);
    game.highlightCard({ col: parseInt(req.params.col, 10), row: parseInt(req.params.row, 10) });
    res.json({
      game: game.state,
    });
  });

  router.post('/api/v1/room/:tag/game/reveal/:col/:row', (req: Request, res: Response, next) => {
    const room = rooms.getRoom(req.params.tag);
    if (room === undefined) {
      return next(new Error(`Cannot find room with tag ${req.params.tag}`));
    }
    if (room.gameId === undefined) {
      return next(new Error(`The room has no active game!`));
    }
    const game = games.findById(room.gameId);
    game.revealCard({ col: parseInt(req.params.col, 10), row: parseInt(req.params.row, 10) });
    res.json({
      game: game.state,
    });
  });

  router.use(errorHandler);

  return router;
};
