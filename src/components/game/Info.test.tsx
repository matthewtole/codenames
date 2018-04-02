import * as React from 'react';
import { Info } from './Info';
import * as renderer from 'react-test-renderer';
import { Team } from '../../reducers/game';

describe('Info', () => {
  const defaultProps = {
    turn: Team.RED,
    spyCounts: {
      [Team.RED]: 5,
      [Team.BLUE]: 3,
    },
  };

  it('renders correctly', () => {
    const info = renderer.create(<Info {...defaultProps} />).toJSON();
    expect(info).toMatchSnapshot();
  });
});
