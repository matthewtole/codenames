import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card } from './Card';
import { Role } from '../../shared/game';
import { shallow } from 'enzyme';
import { NOOP, fakeClickEvent } from '../../shared/test-utils';
import { BoardMode } from './Board';

describe('Card', () => {
  it('calls onHighlight when clicked if not already highlighted', () => {
    const onHighlight = jest.fn();
    const onReveal = jest.fn();
    const card = shallow(<Card
      word="test"
      role={Role.BlueSpy}
      revealed={false}
      highlighted={false}
      onReveal={onReveal}
      onHighlight={onHighlight}
      boardMode={BoardMode.Controller}
    />);
    card.simulate('click', fakeClickEvent);
    expect(onHighlight).toBeCalled();
    expect(onReveal).not.toBeCalled();
  });

  it('calls onReveal when clicked if not already highlighted', () => {
    const onHighlight = jest.fn();
    const onReveal = jest.fn();
    const card = shallow(<Card
      word="test"
      role={Role.BlueSpy}
      revealed={false}
      highlighted={true}
      onReveal={onReveal}
      onHighlight={onHighlight}
      boardMode={BoardMode.Controller}
    />);
    card.simulate('click', fakeClickEvent);
    expect(onHighlight).not.toBeCalled();
    expect(onReveal).toBeCalled();
  });

  it('should not call onReveal or onHighlight if the card is already revealed', () => {
    const onHighlight = jest.fn();
    const onReveal = jest.fn();
    const card = shallow(<Card
      word="test"
      role={Role.BlueSpy}
      revealed={true}
      highlighted={true}
      onReveal={onReveal}
      onHighlight={onHighlight}
      boardMode={BoardMode.Controller}
    />);
    card.simulate('click', fakeClickEvent);
    expect(onHighlight).not.toBeCalled();
    expect(onReveal).not.toBeCalled();
  });
});
