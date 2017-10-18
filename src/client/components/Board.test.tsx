import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Board, BoardMode } from './Board';
import { Card } from './Card';
import { randomWords, words as WordLists } from '../../shared/data/words';
import { Game, Role, Team, CardData } from '../../shared/game';
import { NOOP, fakeClickEvent } from '../../shared/test-utils';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

function makeRandomCards(): CardData[] {
  const words: string[] = randomWords(WordLists['original'], 25);
  const roles: Role[] = Game.randomRoles(Team.Blue);
  return roles.map((role, index) => ({
    role,
    word: words[index],
    isRevealed: false,
    highlighted: false,
  }));
}

describe('Board', () => {
  it('renders without crashing', () => {
    Enzyme.shallow(<Board
      width={5}
      height={5}
      cards={makeRandomCards()}
      mode={BoardMode.Viewer}
      onRevealCard={NOOP}
      onHighlightCard={NOOP}
    />);
  });

  it('should mark the appropriate card as highlighted', () => {
    const board = Enzyme.mount(<Board
      width={5}
      height={5}
      cards={makeRandomCards()}
      highlighted={Game.indexToCoordinate(5)}
      mode={BoardMode.Viewer}
      onRevealCard={NOOP}
      onHighlightCard={NOOP}
    />);
    expect(board.find(Card).at(5).prop('highlighted')).toBeTruthy();
  });

  it('should call onHighlightCard with the correct coordinate', () => {
    const onHighlightCard = jest.fn();
    const board = Enzyme.mount(<Board
      width={5}
      height={5}
      cards={makeRandomCards()}
      mode={BoardMode.Viewer}
      onRevealCard={NOOP}
      onHighlightCard={onHighlightCard}
    />);
    board.find(Card).at(13).simulate('click', fakeClickEvent);
    expect(onHighlightCard).toBeCalledWith(Game.indexToCoordinate(13));
  });

  it('should call onRevealCard with the correct coordinate', () => {
    const onRevealCard = jest.fn();
    const board = Enzyme.mount(<Board
      width={5}
      height={5}
      cards={makeRandomCards()}
      mode={BoardMode.Viewer}
      highlighted={Game.indexToCoordinate(20)}
      onRevealCard={onRevealCard}
      onHighlightCard={NOOP}
    />);
    board.find(Card).at(20).simulate('click', fakeClickEvent);
    expect(onRevealCard).toBeCalledWith(Game.indexToCoordinate(20));
  });
});
