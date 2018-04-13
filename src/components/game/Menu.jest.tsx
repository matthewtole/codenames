import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { GameMenu, GameMenuProps } from './Menu';
import { BoardMode } from './Board';
import { RulesetName, DictionaryName } from '../../redux/game/types';
import { MemoryRouter } from 'react-router';

describe('GameMenu', () => {
  const defaultProps: GameMenuProps = {
    isShown: true,
    onClose: jest.fn(),
    roomId: 'room-id',
    boardMode: BoardMode.CONTROLLER,
    ruleset: RulesetName.DRINKING,
    dictionary: DictionaryName.DUET,
    setDictionary: jest.fn(),
    setRuleset: jest.fn(),
    generateCode: jest.fn(),
    enterFullscreen: jest.fn(),
    exitFullscreen: jest.fn(),
    isFullscreen: false,
  };

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <GameMenu {...defaultProps} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
