import * as firebase from 'firebase';
import {
  DictionaryName,
  RulesetName,
  Team,
  Coordinate,
  Card,
  MessageKey,
} from '../redux/game/types';
import { GameState, GameStateLoaded } from '../redux/game/reducers';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

interface GameDoc {
  cards: Card[];
  revealedCards: number[];
  ruleset: RulesetName;
  turn: Team;
  dictionary: DictionaryName;
  messageKey: MessageKey | null;
  highlighted: Coordinate | null;
  winner: Team | null;
}

export class FirebaseSync {
  private config: FirebaseConfig;

  private static gameToDoc(game: GameStateLoaded): GameDoc {
    return {
      cards: game.cards,
      ruleset: game.ruleset,
      dictionary: game.dictionary,
      turn: game.turn,
      messageKey: game.messageKey || null,
      revealedCards: game.revealedCards.toArray(),
      highlighted: game.highlighted || null,
      winner: game.winner || null,
    };
  }

  constructor(config: FirebaseConfig) {
    this.config = config;
  }

  connect() {
    firebase.initializeApp(this.config);
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error: Error) {
        console.error(error); // tslint:disable-line:no-console
      });
  }

  subscribeToGame(id: string, callback: (data: GameDoc) => void) {
    this.unsubscribeFromGame(id);
    this.game(id).on('value', (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val());
    });
  }

  unsubscribeFromGame(id: string) {
    this.game(id).off('value');
  }

  subscribeToRoom(id: string, callback: (data: { gameId: string }) => void) {
    this.unsubscribeFromRoom(id);
    this.room(id).on('value', (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val());
    });
  }

  unsubscribeFromRoom(id: string) {
    this.room(id).off('value');
  }

  async createGame(data: GameState): Promise<void> {
    return firebase
      .database()
      .ref(`/games/${data.id}`)
      .set(FirebaseSync.gameToDoc(data as GameStateLoaded));
  }

  async createRoom({
    id,
    dictionary,
    ruleset,
  }: {
    id: string;
    dictionary: DictionaryName;
    ruleset: RulesetName;
  }): Promise<void> {
    return firebase
      .database()
      .ref(`/rooms/${id}/`)
      .set({
        dictionary,
        ruleset,
      })
      .then((value: firebase.database.Reference) => {
        return;
      });
  }

  async loadRoom({ id }: { id: string }) {
    return firebase
      .database()
      .ref(`/rooms/${id}`)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const data = snapshot.val();
        return {
          id: snapshot.key!,
          gameId: data.gameId,
          dictionary: data.dictionary,
          ruleset: data.ruleset,
        };
      });
  }

  async setGameId(roomId: string, gameId: string) {
    return firebase
      .database()
      .ref(`/rooms/${roomId}/gameId`)
      .set(gameId);
  }

  async updateRoom(
    roomId: string,
    data: { ruleset?: RulesetName; dictionary?: DictionaryName }
  ) {
    return firebase
      .database()
      .ref(`/rooms/${roomId}`)
      .update(data);
  }

  async loadGame({ id }: { id: string }): Promise<GameDoc> {
    return this.game(id)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const data = snapshot.val();
        if (data) {
          return snapshot.val();
        } else {
          // TODO: Handle this!
          // api.dispatch(loadGameFailed());
        }
      });
  }

  async sync({ id, data }: { id: string; data: GameStateLoaded }) {
    return this.game(id).set(FirebaseSync.gameToDoc(data));
  }

  async generateCode(id: string): Promise<{ code: string; timeout: Date }> {
    const code = this.generateRandomCode();
    const timeout = new Date(new Date().getTime() + 5 * 60 * 1000);
    return firebase
      .database()
      .ref(`/codes/${code}`)
      .set({
        id,
        timeout: timeout.getTime(),
      })
      .then(() => {
        return { code, timeout };
      });
  }

  async findRoomByCode(code: string): Promise<string | null> {
    return firebase
      .database()
      .ref(`/codes/${code}/id`)
      .once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const data = snapshot.val();
        if (data && data.length) {
          return data;
        }
        return null;
      });
  }

  private game(id: string) {
    return firebase.database().ref(`/games/${id}`);
  }

  private room(id: string) {
    return firebase.database().ref(`/rooms/${id}`);
  }

  private generateRandomCode(): string {
    let code = '';
    for (let c = 0; c < 6; c += 1) {
      code += Math.floor(Math.random() * Math.floor(9));
    }
    return code;
  }
}
