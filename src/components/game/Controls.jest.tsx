import * as React from 'react';
import { Controls } from './Controls';
import * as renderer from 'react-test-renderer';
import { shallow, ShallowWrapper } from 'enzyme';
import { Team } from '../../redux/game/types';

describe('Controls', () => {
  const onEndTurn = jest.fn();
  const onNewGame = jest.fn();
  const onMenuOpen = jest.fn();

  const defaultProps = {
    onEndTurn,
    onNewGame,
    onMenuOpen,
  };

  beforeEach(() => {
    onEndTurn.mockReset();
    onNewGame.mockReset();
  });

  function getEndTurnButton(controls: ShallowWrapper) {
    return controls.find('button').filterWhere(n => n.text() === 'End Turn');
  }

  function getNewGameButton(controls: ShallowWrapper) {
    return controls
      .find('button')
      .filterWhere(n => n.text() === 'Start New Game');
  }

  it('renders correctly', () => {
    const controls = renderer.create(<Controls {...defaultProps} />).toJSON();
    expect(controls).toMatchSnapshot();
  });

  it('should render the End Turn button when there is no winner', () => {
    const controls = shallow(<Controls {...defaultProps} />);
    expect(controls.text()).toContain('End Turn');
  });

  it('should not render the End Turn button when there is a winner', () => {
    const controls = shallow(<Controls {...defaultProps} winner={Team.BLUE} />);
    expect(controls.text()).not.toContain('End Turn');
  });

  it('should render the New Game button when there is no winner', () => {
    const controls = shallow(<Controls {...defaultProps} />);
    expect(controls.text()).toContain('New Game');
  });

  it('should render the New Game button when there is a winner', () => {
    const controls = shallow(<Controls {...defaultProps} winner={Team.BLUE} />);
    expect(controls.text()).toContain('New Game');
  });

  it('should call onEndTurn when clicking the End Turn button', () => {
    const controls = shallow(<Controls {...defaultProps} />);
    getEndTurnButton(controls).simulate('click');
    expect(onEndTurn).toHaveBeenCalled();
  });

  it('should call onNewGame when clicking the Start New Game button', () => {
    const controls = shallow(<Controls {...defaultProps} winner={Team.BLUE} />);
    getNewGameButton(controls).simulate('click');
    expect(onNewGame).toHaveBeenCalled();
  });
});
