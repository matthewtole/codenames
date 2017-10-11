export type GameID = string;
import * as assert from 'assert';
import * as shuffle from 'shuffle-array';
import * as nanoid from 'nanoid';
import { RULE_SETS } from './data/rules';
import { MESSAGES } from './data/messages';
import { randomWords, words as WordLists } from './data/words';
import { RoomTag } from './rooms';

export interface Coordinate {
  row: number;
  col: number;
}

export interface GameOptions {
  rules: string;
  words: string;
}

export enum Role {
  RedSpy = 1,
  BlueSpy = 2,
  Bystander = 3,
  Assassin = 4,
}

export interface CardData {
  word: string;
  isRevealed: boolean;
  role: Role;
}

export interface Card {
  word: string;
  role: Role;
  revealed: boolean;
  highlighted: boolean;
}

export enum Team {
  Red = 1,
  Blue = 2,
}

export interface Message {
  header: string;
  content: string;
}

export interface GameState {
  cards: CardData[];
  turn: Team;
  winner?: Team;
  roleCounts: { [id: number]: number };
  highlighted?: Coordinate;
  message: Message;
}

/**
 * Class that describes a single Codenames game.
 */
export class Game {
  /**
   * The ID of the game
   */
  id: GameID;
  /**
   * The tag of the room this game is being played in
   */
  roomTag: RoomTag;
  /**
   * A list of all of the cards in the game
   */
  cards: Card[];
  /**
   * Which team is currently active
   */
  turn: Team;
  /**
   * Which team won!
   */
  winner?: Team;
  /**
   * The index of the currently highlighted card
   */
  highlighted?: number;
  /**
   * Current message being displayed. Used to display the rules after a card has been revealed
   */
  message?: Message;
  /**
   * Which set of rules this game is using. See ./src/data/rules.ts for the list of possibles
   */
  ruleset: string;

  constructor(roomTag: RoomTag, options: GameOptions) {
    const err = Game.validateOptions(options);
    if (err !== undefined) { throw err; }
    this.id = nanoid();
    this.roomTag = roomTag;
    this.turn = Math.round(Math.random()) === 1 ? Team.Red : Team.Blue;
    this.winner = undefined;
    this.ruleset = options.rules;

    const words: string[] = randomWords(WordLists[options.words], 25);
    const roles: Role[] = Game.randomRoles(this.turn);

    this.cards = roles.map((role, index) => ({
      role,
      word: words[index],
      revealed: false,
      highlighted: false,
    }));
  }

  /**
   * Highlight a card at a given Coordinate (row, column).
   * Only one card can be highlighted at a time, so if a card is already highlighted, it must be
   * unhighlighted first.
   * Cards cannot be highlighted if they have been revealed, or if the game is over.
   * @param cell  The coordinate of the card to highlight
   */
  highlightCard(cell?: Coordinate) {
    if (this.winner !== undefined) { return; }
    if (this.highlighted !== undefined) {
      this.cards[this.highlighted].highlighted = false;
    }
    if (cell === undefined) {
      this.highlighted = undefined;
      return;
    }
    const index = Game.coordinateToIndex(cell);
    if (index < 0 || index >= this.cards.length) {
      return;
    }
    if (this.cards[index].revealed) {
      return;
    }
    this.cards[index].highlighted = true;
    this.highlighted = index;
  }

  /**
   * Reveal the card at a given Coordinate (row, column)
   * A card can only been revealed once, and cards cannot be revealed once the game is over.
   * The act of revealing a card triggers further actions, such as setting the message,
   * changing the active team and setting the winner.
   * @param cell  The coordinate of the card to reveal
   */
  revealCard(cell: Coordinate) {
    if (this.winner !== undefined) { return; }
    const index = Game.coordinateToIndex(cell);
    if (index < 0 || index >= this.cards.length) {
      return;
    }

    if (this.cards[index].revealed) {
      return;
    }
    this.cards[index].revealed = true;

    switch (this.cards[index].role) {
      case Role.Assassin:
        this.setMessage('ASSASSIN');
        this.setWinner(Game.otherPlayer(this.turn));
        break;
      case Role.Bystander:
        this.setMessage('BYSTANDED');
        this.switchTurn();
        break;
      case Game.teamToRole(this.turn):
        this.setMessage('FRIENDLY_SPY');
        break;
      case Game.teamToRole(Game.otherPlayer(this.turn)):
        this.setMessage('ENEMY_SPY');
        this.switchTurn();
        break;
      /* istanbul ignore next */
      default:
        // DO NOTHING
    }
    this.highlightCard();
    this.checkForWinner(index);
  }

  /**
   * Change the turn to the other team.
   */
  endTurn() {
    this.highlightCard();
    this.switchTurn();
  }

  /**
   * Clears the message
   */
  clearMessage() {
    this.message = undefined;
  }

  get state(): GameState {
    return {
      winner: this.winner,
      turn: this.turn,
      cards: this.cards.map(card => ({
        word: card.word,
        isRevealed: card.revealed,
        role: card.role,
      })),
      highlighted: Game.indexToCoordinate(this.highlighted),
      roleCounts: {
        [Role.RedSpy]: this.roleCount(Role.RedSpy),
        [Role.BlueSpy]: this.roleCount(Role.BlueSpy),
      },
      message: this.message,
    };
  }

  /**
   * Converts a Coordinate (row, column) object to a index of the card
   * @param coordinate  The Coordinate object to convert
   */
  static coordinateToIndex(coordinate: Coordinate): number {
    if (coordinate.col < 0 || coordinate.col >= 5 || coordinate.row < 0 || coordinate.row >= 5) {
      return -1;
    }
    return coordinate.row * 5 + coordinate.col;
  }

  /**
   * Converts an array index into the Coordinate of the card on the board
   * @param index The array index to convert
   */
  static indexToCoordinate(index: number): Coordinate {
    if (index < 0 || index >= 25) { return undefined; }
    return { row: Math.floor(index / 5), col: index % 5 };
  }

  /**
   * Utility function to get the other team given a team.
   * @param color
   */
  static otherPlayer(color: Team) {
    if (color === Team.Red) { return Team.Blue; }
    return Team.Red;
  }

  /**
   * Utility function to convert between a Team value and a Role value.
   * @param team
   */
  static teamToRole(team: Team): Role {
    switch (team) {
      case Team.Red: return Role.RedSpy;
      case Team.Blue: return Role.BlueSpy;
      /* istanbul ignore next */
      default: return undefined;
    }
  }

  /**
   * Utility function to convert between a Role value and a Team value.s
   * @param role
   */
  static roleToTeam(role: Role): Team {
    switch (role) {
      case Role.RedSpy: return Team.Red;
      case Role.BlueSpy: return Team.Blue;
    }
  }

  /**
   * Set the current turn to the other team.
   */
  private switchTurn() {
    this.turn = Game.otherPlayer(this.turn);
  }

  /**
   * Set the winner value and update some related properties
   * @param team
   */
  private setWinner(team: Team) {
    this.highlightCard();
    this.winner = team;
    this.turn = team;
  }

  /**
   * Set the message given an event type.
   * @param key
   */
  private setMessage(key: string) {
    this.message = {
      header: MESSAGES[key],
      content: RULE_SETS[this.ruleset][key],
    };
  }

  /**
   * For a given card index, check to see if revealing that card has caused a team to win.
   * @param index
   */
  private checkForWinner(index: number) {
    const role: Role = this.cards[index].role;
    if (role === Role.Assassin || role === Role.Bystander) { return; }
    if (this.roleCount(role) === 0) {
      this.setWinner(Game.roleToTeam(role));
    }
  }

  /**
   * Calculate the number of unrevealed cards for a given role.
   * @param role
   */
  private roleCount(role: Role) {
    let count = 0;
    for (const card of this.cards) {
      if (card.role === role && !card.revealed) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * Randomly create an array of cards given the team that will go first.
   * The team that goes first gets 9 spies, the other team gets 8, there is 1 assassin
   * and the rest are bystandards.
   * @param firstPlayer
   */
  private static randomRoles(firstPlayer: Team): Role[] {
    const roles: Role[] = [];
    for (let red = 0; red < (firstPlayer === Team.Red ? 9 : 8); red += 1) {
      roles.push(Role.RedSpy);
    }
    for (let blue = 0; blue < (firstPlayer === Team.Blue ? 9 : 8); blue += 1) {
      roles.push(Role.BlueSpy);
    }
    for (let bystander = 0; bystander < 7; bystander += 1) {
      roles.push(Role.Bystander);
    }
    roles.push(Role.Assassin);
    assert.equal(roles.length, 25);
    return shuffle(roles);
  }

  /**
   * Validate that a GameOptions object is actually valid.
   * @param options
   */
  private static validateOptions(options: GameOptions) {
    if (!WordLists.hasOwnProperty(options.words)) {
      return new Error(`The specified word list "${options.words}" does not exist!`);
    }
    if (!RULE_SETS.hasOwnProperty(options.rules)) {
      return new Error(`The specified rules "${options.rules}" does not exist!`);
    }
  }
}
