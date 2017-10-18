import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GameControls } from './GameControls';
import { Team } from '../../shared/game';
import { NOOP, fakeClickEvent } from '../../shared/test-utils';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('GameControls', () => {
  describe('-> New Game', () => {
    it('shows the new game button when the game is over', () => {
      const controls = Enzyme.shallow(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: Team.Blue,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={NOOP}
        onNewGame={NOOP}
      />);
      expect(controls.find('button').matchesElement(<button>Start New Game</button>)).toBeTruthy();
    });

    it('does not show the new game button when the game is still going', () => {
      const controls = Enzyme.shallow(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: undefined,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={NOOP}
        onNewGame={NOOP}
      />);
      expect(controls.find('button').matchesElement(<button>Start New Game</button>)).toBeFalsy();
    });

    it('calls the onNewGame prop when clicked', () => {
      const onNewGame = jest.fn();
      const controls = Enzyme.mount(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: Team.Blue,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={NOOP}
        onNewGame={onNewGame}
      />);
      controls.find('button').simulate('click');
      expect(onNewGame).toHaveBeenCalled();
    });
  });

  describe('-> End Turn', () => {
    it('shows the end turn button when the game is still going', () => {
      const controls = Enzyme.shallow(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: undefined,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={NOOP}
        onNewGame={NOOP}
      />);
      expect(controls.find('button').matchesElement(<button>End Turn</button>)).toBeTruthy();
    });

    it('does not show the end turn button when the game is over', () => {
      const controls = Enzyme.shallow(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: Team.Blue,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={NOOP}
        onNewGame={NOOP}
      />);
      expect(controls.find('button').matchesElement(<button>End Turn</button>)).toBeFalsy();
    });

    it('calls the onEndTurn prop when clicked', () => {
      const onEndTurn = jest.fn();
      const controls = Enzyme.mount(<GameControls
        state={{
          cards: [],
          turn: Team.Blue,
          winner: undefined,
          roleCounts: {},
          message: undefined,
        }}
        onEndTurn={onEndTurn}
        onNewGame={NOOP}
      />);
      controls.find('button').simulate('click');
      expect(onEndTurn).toHaveBeenCalled();
    });
  });
});

