import React, { Component } from 'react';
import './App.css';
import Game from './lib/game';

const game = new Game('original');
game.init();
console.log(game._grid);

class App extends Component {
  render() {
    return (

    );
  }
}

export default App;
