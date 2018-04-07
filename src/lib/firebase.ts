import * as firebase from 'firebase';
import { Card, Team, Coordinate, Message, GameData } from '../lib/types';

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
  ruleset: string;
  turn: Team;
  wordlist: string;
  message: Message | null;
  highlighted: Coordinate | null;
  winner: Team | null;
}

export class FirebaseSync {
  private config: FirebaseConfig;

  private static gameToDoc(game: GameData): GameDoc {
    return {
      cards: game.cards,
      ruleset: game.ruleset,
      wordlist: game.wordlist,
      turn: game.turn,
      message: game.message || null,
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

  async createGame(data: GameData) {
    return firebase
      .database()
      .ref('/games/')
      .push(FirebaseSync.gameToDoc(data))
      .then((value: firebase.database.Reference) => {
        return value.key!;
      });
  }

  async createRoom({
    wordlist,
    ruleset,
  }: {
    wordlist: string;
    ruleset: string;
  }) {
    return firebase
      .database()
      .ref('/rooms')
      .push({
        wordlist,
        ruleset,
      })
      .then((value: firebase.database.Reference) => {
        return value.key!;
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
          wordlist: data.wordlist,
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

  async joinGame({ id }: { id: string }) {
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

  async sync({ id, data }: { id: string; data: GameData }) {
    console.log(data); // tslint:disable-line
    return this.game(id).set(FirebaseSync.gameToDoc(data));
  }

  private game(id: string) {
    return firebase.database().ref(`/games/${id}`);
  }

  private room(id: string) {
    return firebase.database().ref(`/rooms/${id}`);
  }
}
