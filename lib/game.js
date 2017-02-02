'use strict';

const WordList = require('../data/words');
const assert = require('assert');
const shuffle = require('shuffle-array');
const { EventEmitter } = require('events');

class Game extends EventEmitter {
  constructor(mode) {
    super();
    this._mode = mode;
    this.startRound();
  }

  get state() {
    return {
      turn: this._turn,
      grid: this._grid,
      spyCounts: this._spyCounts,
      winner: this._winner
    };
  }

  setMode(mode) {
    this._mode = mode;
  }

  endGame(winner) {
    this._winner = winner;
  }

  switchTurn() {
    this._turn = this._turn === Game.BLUE ? Game.RED : Game.BLUE;
  }

  reveal(x, y) {
    const person = this._grid[y][x];
    if (person.revealed) {
      return;
    }

    if (person.role === Game.ASSASSIN) {
      this.emit('event', { event: 'ASSASSIN', team: this._turn });
      this.endGame(this._turn === Game.BLUE ? Game.RED : Game.BLUE);
    } else if (person.role === Game.CIVILIAN) {
      this.emit('event', { event: 'CIVILIAN', team: this._turn });
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

  startRound() {
    const words = Game._randomWords(this._mode, 25);
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

  static _randomPeople(firstTurn) {
    const people = [];
    for (let red = 0; red < (firstTurn === Game.RED ? 9 : 8); red += 1) {
      people.push(Game.RED);
    }
    for (let blue = 0; blue < (firstTurn === Game.BLUE ? 9 : 8); blue += 1) {
      people.push(Game.BLUE);
    }
    for (let civilian = 0; civilian < 7; civilian += 1) {
      people.push(Game.CIVILIAN);
    }
    people.push(Game.ASSASSIN);
    assert.equal(people.length, 25);
    return shuffle(people);
  }

  static _randomWords(wordlist, count) {
    assert(WordList[wordlist], `No words found for mode ${wordlist}!`);

    const words = [];
    for (let w = 0; w < count; w += 1) {
      let word = null;
      while (word === null || words.indexOf(word) >= 0) {
        const index = Math.floor(Math.random() * WordList[wordlist].length);
        word = WordList[wordlist][index];
      }
      words.push(word);
    }
    return words;
  }
}

Game.BLUE = 'blue';
Game.RED = 'red';
Game.CIVILIAN = 'civilian';
Game.ASSASSIN = 'assassin';

module.exports = Game;
