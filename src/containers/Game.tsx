import * as React from 'react';
import * as Immutable from 'immutable';
import { BoardMode, Board } from '../components/game/Board';
import {
  Coordinate,
  Card,
  Message,
  Team,
  RulesetName,
  DictionaryName,
} from '../redux/game/types';
import { State } from '../redux/store';
import {
  createGame,
  clearMessage,
  endTurn,
  revealCard,
  highlightCard,
} from '../redux/game/action_creators';
import * as uuid from 'uuid';
import { Dispatch } from 'redux';
import { Action } from '../redux/actions';
import { Info } from '../components/game/Info';
import { ModalMessage } from '../components/game/Message';
import { GameMenu } from '../components/game/Menu';
import { Controls } from '../components/game/Controls';
import { connect } from 'react-redux';
import { GameStateLoaded } from '../redux/game/reducers';
import * as GameSelectors from '../redux/game/selectors';
import { hideMenu, showMenu } from '../redux/ui/action_creators';
import { generateCode, clearCode } from '../redux/room/action_creators';
import { ModalRoomCode } from '../components/game/RoomCode';

interface GameProps {
  id: string;
  mode: BoardMode;
  ruleset: RulesetName;
  dictionary: DictionaryName;
}

interface DispatchProps {
  onHighlightCard: (card: Coordinate) => void;
  onRevealCard: (card: Coordinate) => void;
  onMessageClosed: () => void;
  onEndTurn: () => void;
  onNewGame: (mode: BoardMode) => void;
  onMenuOpen: () => void;
  closeMenu: () => void;
  onGenerateCode: () => void;
  onClearCode: () => void;
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
  roomCode?: string;
}

type Props = GameProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  return {
    loading: state.game.loading,
    cards: (state.game as GameStateLoaded).cards,
    highlighted: (state.game as GameStateLoaded).highlighted,
    revealedCards: (state.game as GameStateLoaded).revealedCards,
    message: (state.game as GameStateLoaded).message,
    winner: (state.game as GameStateLoaded).winner,
    isMenuShown: state.ui.isMenuShown,
    roomId: state.room.id!,
    turn: (state.game as GameStateLoaded).turn,
    spyCounts: {
      [Team.RED]: GameSelectors.spyCount(state, Team.RED),
      [Team.BLUE]: GameSelectors.spyCount(state, Team.BLUE),
    },
    roomCode: state.room.code,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: Props
): DispatchProps => {
  return {
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
    onNewGame: () => {
      dispatch(
        createGame({
          id: uuid.v4(),
          ruleset: ownProps.ruleset,
          dictionary: ownProps.dictionary,
        })
      );
    },
    onMenuOpen: () => {
      dispatch(showMenu());
    },
    closeMenu: () => {
      dispatch(hideMenu());
    },
    onGenerateCode: () => {
      dispatch(generateCode());
    },
    onClearCode: () => {
      dispatch(clearCode());
    },
  };
};

class Game extends React.PureComponent<Props, {}> {
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
      ruleset,
      dictionary,
      roomCode,
      onClearCode,
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
          <Info
            turn={turn!}
            winner={winner!}
            spyCounts={spyCounts!}
            onMenuOpen={onMenuOpen}
            showMenu={mode === BoardMode.Viewer}
          />
          {message ? (
            <ModalMessage message={message} onClose={onMessageClosed!} />
          ) : null}
          {roomCode ? (
            <ModalRoomCode code={roomCode} onClose={onClearCode} />
          ) : null}
          <GameMenu
            isShown={isMenuShown}
            onClose={closeMenu}
            boardMode={mode!}
            roomId={roomId}
            ruleset={ruleset}
            dictionary={dictionary}
            setRuleset={this.handleSetRuleset}
            setDictionary={this.handleSetDictionary}
            generateCode={this.handleGenerateCode}
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
              showMenu={mode === BoardMode.Controller}
            />
          ) : null}
        </div>
      );
    }
    return null;
  }

  private handleSetRuleset = (ruleset: RulesetName) => {
    this.props.closeMenu();
  }

  private handleSetDictionary = (dictionary: DictionaryName) => {
    this.props.closeMenu();
  }

  private handleGenerateCode = () => {
    this.props.onGenerateCode();
    this.props.closeMenu();
  }
}

export const ConnectedGame = connect<StateProps, DispatchProps, GameProps>(
  mapStateToProps,
  mapDispatchToProps
)(Game);
