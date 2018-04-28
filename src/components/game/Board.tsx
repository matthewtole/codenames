import * as React from 'react';
import './Board.css';
import { Card as CardComponent } from './Card';
import {
  Card,
  Coordinate,
  Role,
  CoordinateValue,
} from '../../redux/game/types';

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
  highlightedRow?: number;
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
          {this.renderRowHighlight()}
          {Array(this.props.height)
            .fill(0)
            .map((_: number, row: CoordinateValue) => this.renderRow(row))}
        </div>
      </div>
    );
  }

  private renderRowHighlight() {
    if (this.props.highlightedRow === undefined) {
      return null;
    }
    const row = this.props.highlightedRow;
    return (
      <div className="Board__row-highlight-wrapper">
        <div
          className="Board__row-highlight"
          style={{ top: 0, height: `${row * 20}%` }}
        />
        <div
          className="Board__row-highlight"
          style={{
            top: `${(row + 1) * 20}%`,
            height: `${(5 - row + 1) * 20}%`,
          }}
        />
      </div>
    );
  }

  private renderRow = (row: CoordinateValue) => {
    return (
      <div className="BoardRow" key={`row_${row}`}>
        {Array(this.props.width)
          .fill(0)
          .map((__: number, col: CoordinateValue) => this.renderCard(row, col))}
      </div>
    );
  }

  private renderCard = (row: CoordinateValue, col: CoordinateValue) => {
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
