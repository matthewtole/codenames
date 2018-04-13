import * as React from 'react';
import * as Immutable from 'immutable';
import { BoardMode, Board } from '../components/game/Board';
import {
  Coordinate,
  Card,
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
import {
  hideMenu,
  showMenu,
  enterFullscreen,
  exitFullscreen,
} from '../redux/ui/action_creators';
import {
  generateCode,
  clearCode,
  changeRuleset,
  changeDictionary,
} from '../redux/room/action_creators';
import { ModalRoomCode } from '../components/game/RoomCode';
import { Loading } from '../components/Loading';
import { Messages, Message } from '../lib/message';

interface GameProps {
  id: string;
  mode: BoardMode;
  ruleset: RulesetName;
  dictionary: DictionaryName;
}

interface DispatchProps {
  onHighlightCard: (card: Coordinate) => void;
  onClearHighlight: () => void;
  onRevealCard: (card: Coordinate) => void;
  onMessageClosed: () => void;
  onEndTurn: () => void;
  onNewGame: (mode: BoardMode) => void;
  onMenuOpen: () => void;
  closeMenu: () => void;
  onGenerateCode: () => void;
  onClearCode: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onChangeRuleset: (ruleset: RulesetName) => void;
  onChangeDictionary: (dictionary: DictionaryName) => void;
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
  isFullscreen: boolean;
}

type Props = GameProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, ownProps: Props): StateProps => {
  const game = state.game as GameStateLoaded;
  return {
    loading: game.loading,
    cards: game.cards,
    highlighted: game.highlighted,
    revealedCards: game.revealedCards,
    message: game.messageKey
      ? Messages.render(game.turn, game.ruleset, game.messageKey, ownProps.mode)
      : undefined,
    winner: game.winner,
    isMenuShown: state.ui.isMenuShown,
    roomId: state.room.id!,
    turn: game.turn,
    spyCounts: {
      [Team.RED]: GameSelectors.spyCount(state, Team.RED),
      [Team.BLUE]: GameSelectors.spyCount(state, Team.BLUE),
    },
    roomCode: state.room.code,
    isFullscreen: state.ui.isFullscreen,
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
    onClearHighlight: () => {
      dispatch(highlightCard({ card: null }));
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
    onEnterFullscreen: () => {
      dispatch(enterFullscreen());
    },
    onExitFullscreen: () => {
      dispatch(exitFullscreen());
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
    onChangeRuleset: (ruleset: RulesetName) => {
      dispatch(changeRuleset({ ruleset }));
    },
    onChangeDictionary: (dictionary: DictionaryName) => {
      dispatch(changeDictionary({ dictionary }));
    },
  };
};

class Game extends React.PureComponent<Props, {}> {
  render() {
    const {
      onHighlightCard,
      onClearHighlight,
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
      onEnterFullscreen,
      onExitFullscreen,
      isFullscreen,
    } = this.props;
    if (loading) {
      return <Loading />;
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
            showMenu={mode === BoardMode.VIEWER}
            onClearHighlight={onClearHighlight}
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
            enterFullscreen={onEnterFullscreen}
            exitFullscreen={onExitFullscreen}
            isFullscreen={isFullscreen}
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
          {mode === BoardMode.CONTROLLER ? (
            <Controls
              winner={winner}
              onEndTurn={onEndTurn}
              onNewGame={() => onNewGame(mode!)}
              onMenuOpen={onMenuOpen}
              showMenu={mode === BoardMode.CONTROLLER}
            />
          ) : null}
        </div>
      );
    }
    return null;
  }

  private handleSetRuleset = (ruleset: RulesetName) => {
    this.props.closeMenu();
    this.props.onChangeRuleset(ruleset);
  }

  private handleSetDictionary = (dictionary: DictionaryName) => {
    this.props.closeMenu();
    this.props.onChangeDictionary(dictionary);
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
