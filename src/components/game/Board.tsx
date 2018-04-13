import * as React from 'react';
import './Board.css';
import { Card as CardComponent } from './Card';
import { Card, Coordinate, Role } from '../../redux/game/types';

export enum BoardMode {
  VIEWER = 'VIEWER',
  CONTROLLER = 'CONTROLLER',
}

export interface BoardProps {
  width: number;
  height: number;
  cards: Card[];
  revealedCards: number[];
  mode: BoardMode;
  highlighted?: Coordinate;
  isGameOver: boolean;
  onRevealCard: (card: Coordinate) => void;
  onHighlightCard: (card?: Coordinate) => void;
}

export class Board extends React.PureComponent<BoardProps, {}> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="BoardWrapper" onClick={() => this.highlightCard()}>
        <div className="Board">
          {Array(this.props.height)
            .fill(0)
            .map((_: number, row: number) => this.renderRow(row))}
        </div>
      </div>
    );
  }

  private renderRow = (row: number) => {
    return (
      <div className="BoardRow" key={`row_${row}`}>
        {Array(this.props.width)
          .fill(0)
          .map((__: number, col: number) => this.renderCard(row, col))}
      </div>
    );
  }

  private renderCard = (row: number, col: number) => {
    const index = this.coordinateToIndex({ row, col });
    return (
      <CardComponent
        key={`card_${row}_${col}`}
        word={this.getWord(index)}
        role={this.getRole(index)}
        revealed={this.isRevealed(index)}
        highlighted={this.isHighlighted({ row, col })}
        onHighlight={() => {
          this.highlightCard({ row, col });
        }}
        onReveal={() => {
          this.revealCard({ row, col });
        }}
        boardMode={this.props.mode}
        isGameOver={this.props.isGameOver}
      />
    );
  }

  private getWord = (index: number): string => {
    return this.props.cards[index].word;
  }

  private getRole = (index: number): Role => {
    return this.props.cards[index].role;
  }

  private isRevealed = (index: number): boolean => {
    return this.props.revealedCards.indexOf(index) >= 0;
  }

  private isHighlighted = (card: Coordinate): boolean => {
    if (this.props.highlighted === undefined) {
      return false;
    }
    return (
      this.props.highlighted.row === card.row &&
      this.props.highlighted.col === card.col
    );
  }

  private highlightCard = (card?: Coordinate) => {
    this.props.onHighlightCard(card);
  }

  private revealCard = (card: Coordinate) => {
    this.props.onRevealCard(card);
  }

  private coordinateToIndex(coordinate: Coordinate): number {
    return coordinate.row * this.props.width + coordinate.col;
  }
}
