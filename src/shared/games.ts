import { Game, GameID, GameOptions } from './game';
import { RoomTag } from './rooms';

export class Games {
  games: Game[];

  constructor() {
    this.games = [];
  }

  createGame(roomTag: RoomTag, options: GameOptions): Game {
    const game = new Game(roomTag, options);
    this.games.push(game);
    return game;
  }

  findById(id: GameID): Game | undefined {
    for (const game of this.games) {
      if (game.id === id) { return game; }
    }
    return undefined;
  }
}
