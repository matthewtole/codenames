import { connect, Dispatch } from 'react-redux';
import { State } from '../reducers/index';
import { Action } from '../actions/index';
import * as React from 'react';
import {
  createGame,
  highlightCard,
  revealCard,
  joinGame,
  clearMessage,
  endTurn,
  showMenu,
  hideMenu,
} from '../actions/game';
import { Coordinate, Team, Card, Message } from '../reducers/game';
import { Board, BoardMode } from '../components/game/Board';
import { ModalMessage } from '../components/game/Message';
import { Info } from '../components/game/Info';
import * as GameSelectors from '../selectors/game';
import { Controls } from '../components/game/Controls';
import * as Immutable from 'immutable';
import { GameMenu } from '../components/game/Menu';

interface GameProps {
  id: string;
  mode: BoardMode;
}

interface DispatchProps {
  onClickCreate: () => void;
  onClickJoin: (id: string, mode: BoardMode) => void;
  onHighlightCard: (card: Coordinate) => void;
  onRevealCard: (card: Coordinate) => void;
  onMessageClosed: () => void;
  onEndTurn: () => void;
  onNewGame: (mode: BoardMode) => void;
  onMenuOpen: () => void;
  closeMenu: () => void;
}

interface StateProps {
  loading: boolean;
  mode?: BoardMode;
  cards?: Card[];
  highlighted?: Coordinate;
  revealedCards?: Immutable.Set<number>;
  message?: Message;
  winner?: Team;
  turn?: Team;
  spyCounts?: { [key: string]: number };
  isMenuShown: boolean;
  roomId: string;
}

type Props = GameProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  if (!state.game) {
    return { loading: false, isMenuShown: false, roomId: '' };
  }
  if (!state.game.data) {
    return {
      loading: state.game.loading,
      isMenuShown: state.game.isMenuShown,
      roomId: '',
    };
  }
  return {
    loading: state.game.loading,
    mode: state.game.mode!,
    cards: state.game.data!.cards,
    highlighted: state.game.data!.highlighted,
    revealedCards: state.game.data!.revealedCards,
    message: state.game.data!.message,
    winner: GameSelectors.winner(GameSelectors.getGameState(state)),
    turn: state.game.data!.turn,
    spyCounts: {
      [Team.RED]: GameSelectors.spyCount(
        GameSelectors.getGameState(state),
        Team.RED
      ),
      [Team.BLUE]: GameSelectors.spyCount(
        GameSelectors.getGameState(state),
        Team.BLUE
      ),
    },
    isMenuShown: state.game.isMenuShown,
    roomId: state.room.id!,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): DispatchProps => {
  return {
    onClickCreate: () => {
      // TODO: These values should not be hardcoded!
      dispatch(
        createGame({
          rules: 'strip',
          words: 'original',
          mode: BoardMode.Controller,
        })
      );
    },
    onClickJoin: (id: string, mode: BoardMode) => {
      dispatch(joinGame({ id, mode }));
    },
    onHighlightCard: (card: Coordinate) => {
      dispatch(highlightCard({ card }));
    },
    onRevealCard: (card: Coordinate) => {
      dispatch(revealCard({ card }));
    },
    onEndTurn: () => {
      dispatch(endTurn());
    },
    onMessageClosed: () => {
      dispatch(clearMessage());
    },
    onNewGame: (mode: BoardMode) => {
      // TODO: These values should not be hardcoded!
      dispatch(createGame({ rules: 'strip', words: 'original', mode }));
    },
    onMenuOpen: () => {
      dispatch(showMenu());
    },
    closeMenu: () => {
      dispatch(hideMenu());
    },
  };
};

class Test extends React.PureComponent<Props, {}> {
  componentDidMount() {
    if (this.props.id) {
      this.props.onClickJoin(this.props.id, this.props.mode);
    }
  }
  render() {
    const {
      onHighlightCard,
      onRevealCard,
      cards,
      highlighted,
      revealedCards,
      message,
      onMessageClosed,
      onEndTurn,
      onNewGame,
      onMenuOpen,
      turn,
      winner,
      spyCounts,
      mode,
      loading,
      isMenuShown,
      closeMenu,
      roomId,
    } = this.props;
    if (loading) {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content has-text-centered has-text-white">
            <i className="fa fa-4x fa-spinner fa-pulse" />
          </div>
        </div>
      );
    }
    if (cards) {
      return (
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Info turn={turn!} winner={winner!} spyCounts={spyCounts!} />
          {message ? (
            <ModalMessage message={message} onClose={onMessageClosed!} />
          ) : null}
          <GameMenu
            isShown={isMenuShown}
            onClose={closeMenu}
            boardMode={mode!}
            roomId={roomId}
          />

          <Board
            cards={cards!}
            width={5}
            height={5}
            mode={mode!}
            revealedCards={revealedCards!.toArray()}
            onRevealCard={onRevealCard!}
            onHighlightCard={onHighlightCard!}
            highlighted={highlighted}
          />
          {mode === BoardMode.Controller ? (
            <Controls
              winner={winner}
              onEndTurn={onEndTurn}
              onNewGame={() => onNewGame(mode!)}
              onMenuOpen={onMenuOpen}
            />
          ) : null}
        </div>
      );
    }
    return null;
  }
}

export const ConnectedTest = connect<StateProps, DispatchProps, GameProps>(
  mapStateToProps,
  mapDispatchToProps
)(Test);
