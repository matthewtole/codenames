import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { BoardProps, BoardMode, Board } from './Board';
import { OriginalCards1 } from '../../fixtures/cards';

describe('Board', () => {
  const defaultProps: BoardProps = {
    cards: OriginalCards1,
    width: 5,
    height: 5,
    revealedCards: [],
    mode: BoardMode.CONTROLLER,
    isGameOver: false,
    onRevealCard: jest.fn(),
    onHighlightCard: jest.fn(),
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Board {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
