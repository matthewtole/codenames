import * as React from 'react';
import { Info, InfoProps } from './Info';
import * as renderer from 'react-test-renderer';
import { Team } from '../../redux/game/types';

describe('Info', () => {
  const defaultProps: InfoProps = {
    turn: Team.RED,
    spyCounts: {
      [Team.RED]: 5,
      [Team.BLUE]: 3,
    },
    onMenuOpen: jest.fn(),
    onClearHighlight: jest.fn(),
    showMenu: true,
  };

  it('renders correctly', () => {
    const info = renderer.create(<Info {...defaultProps} />).toJSON();
    expect(info).toMatchSnapshot();
  });
});
