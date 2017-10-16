import * as React from 'react';
import './Board.css';
import { Card } from './Card';
import { CardData, Coordinate, Role } from '../../shared/game';

export enum BoardMode {
  Viewer = 'viewer',
  Controller = 'controller',
}

export interface BoardProps {
  width: number;
  height: number;
  cards: CardData[];
  mode: BoardMode;
  highlighted?: Coordinate;
  onRevealCard: (card: Coordinate) => void;
  onHighlightCard: (card?: Coordinate) => void;
}

export interface BoardState {
  highlighted?: Coordinate;
}

export class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {};
  }

  render() {
    const rows = [];
    for (let r = 0; r < this.props.height; r += 1) {
      const row = [];
      for (let c = 0; c < this.props.width; c += 1) {
        const card = { row: r, col: c };
        row.push((
          <Card
            key={`card_${r}_${c}`}
            word={this.getWord(card)}
            role={this.getRole(card)}
            revealed={this.isRevealed(card)}
            highlighted={this.isHighlighted(card)}
            onHighlight={() => { this.highlightCard(card); }}
            onReveal={() => { this.revealCard(card); }}
          />
        ));
      }
      rows.push(<div className="BoardRow" key={`row_${r}`}>{row}</div>);
    }
    const classes = ['Board'];
    switch (this.props.mode) {
      case BoardMode.Controller: classes.push('Board--controller'); break;
      case BoardMode.Viewer: classes.push('Board--viewer'); break;
      default: // do nothing!
    }
    return (
      <div className="BoardWrapper" onClick={() => this.highlightCard()}>
        <div className={classes.join(' ')}>{rows}</div>
      </div>
    );
  }

  getWord = (card: Coordinate): string => {
    return this.props.cards[this.coordinateToIndex(card)].word;
  }

  getRole = (card: Coordinate): Role => {
    return this.props.cards[this.coordinateToIndex(card)].role;
  }

  isRevealed = (card: Coordinate): boolean => {
    return this.props.cards[this.coordinateToIndex(card)].isRevealed;
  }

  isHighlighted = (card: Coordinate): boolean => {
    if (this.props.highlighted === undefined) { return false; }
    return this.props.highlighted.row === card.row && this.props.highlighted.col === card.col;
  }

  highlightCard = (card?: Coordinate) => {
    this.props.onHighlightCard(card);
  }

  revealCard = (card: Coordinate) => {
    this.props.onRevealCard(card);
  }

  private coordinateToIndex(coordinate: Coordinate): number {
    return coordinate.row * this.props.width + coordinate.col;
  }
}
