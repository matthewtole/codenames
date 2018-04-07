import * as React from 'react';
import { Card, CardProps } from './Card';
import * as renderer from 'react-test-renderer';
import { BoardMode } from './Board';
import { shallow } from 'enzyme';
import { Role } from '../../lib/types';

describe('Card', () => {
  const onReveal = jest.fn();
  const onHighlight = jest.fn();
  const stopPropagation = jest.fn();

  const defaultProps: CardProps = {
    word: 'test',
    role: Role.BLUE_SPY,
    boardMode: BoardMode.Viewer,
    revealed: false,
    highlighted: false,
    onReveal,
    onHighlight,
  };

  beforeEach(() => {
    onReveal.mockReset();
    onHighlight.mockReset();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Card {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onHighlight when clicked and not highlighted', () => {
    const card = shallow(<Card {...defaultProps} />);
    card.simulate('click', { stopPropagation });
    expect(onReveal).not.toHaveBeenCalled();
    expect(onHighlight).toHaveBeenCalled();
  });

  it('should call onReveal when clicked and is highlighted', () => {
    const card = shallow(<Card {...defaultProps} highlighted={true} />);
    card.simulate('click', { stopPropagation });
    expect(onReveal).toHaveBeenCalled();
    expect(onHighlight).not.toHaveBeenCalled();
  });

  it('should call neither handler if revealed', () => {
    const card = shallow(<Card {...defaultProps} revealed={true} />);
    card.simulate('click', { stopPropagation });
    expect(onReveal).not.toHaveBeenCalled();
    expect(onHighlight).not.toHaveBeenCalled();
  });
});
