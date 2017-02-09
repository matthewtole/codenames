'use strict';

const WordList = require('../data/words');
const assert = require('assert');
const shuffle = require('shuffle-array');
const { EventEmitter } = require('events');

/**
 * Class to describe a single Codenames game.
 */
class Game extends EventEmitter {

  /**
   * @constructor
   * @param {String} wordList - The list of words to use {original,undercover}.
   */
  constructor(wordList) {
    super();
    this._wordList = wordList;
    const words = Game._randomWords(this._wordList);
    this._turn = Math.round(Math.random()) ? Game.RED : Game.BLUE;
    this._spyCounts = {
      [Game.RED]: this._turn === Game.RED ? 9 : 8,
      [Game.BLUE]: this._turn === Game.BLUE ? 9 : 8
    };
    const people = Game._randomPeople(this._turn);
    this._grid = Game._createGrid(words, people);
    this._highlighted = null;
    this._winner = null;
  }

  /**
   * Getter for the current state of the game.
   * @returns {Object} JS object describing the state of the game
   */
  get state() {
    return {
      turn: this._turn,
      grid: this._grid,
      spyCounts: this._spyCounts,
      winner: this._winner
    };
  }

  /**
   * Ends the game and sets the winner to the given team.
   * @param {String} winner - The team that won {red,blue}
   * @returns {undefined}
   */
  endGame(winner) {
    this._winner = winner;
  }

  /**
   * Switch the current turn to the other team.
   * @returns {undefined}
   */
  switchTurn() {
    this._turn = this._turn === Game.BLUE ? Game.RED : Game.BLUE;
  }

  /**
   * Reveal a single card in the game, given its position on the grid.
   * @param {Number} x - The column of the card (0-5)
   * @param {Number} y - The row of the card (0-5)
   * @returns {undefined}
   */
  reveal(x, y) {
    const person = this._grid[y][x];
    if (person.revealed) {
      return;
    }

    if (person.role === Game.ASSASSIN) {
      this.emit('event', { event: 'ASSASSIN', team: this._turn });
      this.endGame(this._turn === Game.BLUE ? Game.RED : Game.BLUE);
    } else if (person.role === Game.BYSTANDER) {
      this.emit('event', { event: 'BYSTANDER', team: this._turn });
      this.switchTurn();
    } else if (person.role === this._turn) {
      this.emit('event', { event: 'FRIENDLY_SPY', team: this._turn });
    } else {
      this.emit('event', { event: 'ENEMY_SPY', team: this._turn });
      this.switchTurn();
    }

    if (person.role === Game.RED || person.role === Game.BLUE) {
      this._spyCounts[person.role] -= 1;
      if (this._spyCounts[person.role] === 0) {
        this.emit('event', { event: 'VICTORY', team: person.role });
        this.endGame(person.role);
      }
    }

    person.revealed = true;
    if (person.highlighted) {
      person.highlighted = false;
      this._highlighted = null;
    }

    this.emit('change');
  }

  /**
   * Highlight a card on the grid for confirmation.
   * @param {Number} x - The column of the card (0-5)
   * @param {Number} y - The row of the card (0-5)
   * @returns {undefined}
   */
  highlight(x, y) {
    if (this._grid[y][x].revealed) {
      return;
    }

    if (this._highlighted) {
      this._grid[this._highlighted.y][this._highlighted.x].highlighted = false;
    }
    this._grid[y][x].highlighted = true;
    this._highlighted = { x, y };

    this.emit('change');
  }

  /**
   * Internal method to build the grid of cards.
   * @param {String[]} words - Array of words to use
   * @param {String[]} people - Array of roles to assign each card
   * @returns {Array[]} - 2D array of cards
   * @private
   */
  static _createGrid(words, people) {
    const grid = [];
    for (let y = 0; y < 5; y += 1) {
      const row = [];
      for (let x = 0; x < 5; x += 1) {
        row.push({
          role: people[y * 5 + x],
          revealed: false,
          highlighted: false,
          word: words[y * 5 + x]
        });
      }
      grid.push(row);
    }
    return grid;
  }

  /**
   * Generates a random ordering of roles to distribute amongst the cards.
   * @param {String} firstTurn - Which team will take the first turn {red,blue}
   * @returns {String[]} - An array of roles
   * @private
   */
  static _randomPeople(firstTurn) {
    const people = [];
    for (let red = 0; red < (firstTurn === Game.RED ? 9 : 8); red += 1) {
      people.push(Game.RED);
    }
    for (let blue = 0; blue < (firstTurn === Game.BLUE ? 9 : 8); blue += 1) {
      people.push(Game.BLUE);
    }
    for (let bystander = 0; bystander < 7; bystander += 1) {
      people.push(Game.BYSTANDER);
    }
    people.push(Game.ASSASSIN);
    assert.equal(people.length, 25);
    return shuffle(people);
  }

  /**
   * Generates a random list of 25 words from a given word list
   * @param {String} wordList - The list of words to use
   * @returns {Array} Array of 25 random words
   * @private
   */
  static _randomWords(wordList) {
    const words = [];
    for (let w = 0; w < 25; w += 1) {
      let word = null;
      while (word === null || words.indexOf(word) >= 0) {
        const index = Math.floor(Math.random() * WordList[wordList].length);
        word = WordList[wordList][index];
      }
      words.push(word);
    }
    return words;
  }
}

Game.BLUE = 'blue';
Game.RED = 'red';
Game.BYSTANDER = 'bystander';
Game.ASSASSIN = 'assassin';

module.exports = Game;
