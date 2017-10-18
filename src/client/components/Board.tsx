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
    return (
      <div className="BoardWrapper" onClick={() => this.highlightCard()}>
        <div className="Board">
          {
            Array(this.props.height).fill(0).map((_: number, r: number) => (
              <div className="BoardRow" key={`row_${r}`}>
                {
                  Array(this.props.width).fill(0).map((_: number, c: number) => (
                    <Card
                      key={`card_${r}_${c}`}
                      word={this.getWord({ row: r, col: c })}
                      role={this.getRole({ row: r, col: c })}
                      revealed={this.isRevealed({ row: r, col: c })}
                      highlighted={this.isHighlighted({ row: r, col: c })}
                      onHighlight={() => { this.highlightCard({ row: r, col: c }); }}
                      onReveal={() => { this.revealCard({ row: r, col: c }); }}
                      boardMode={this.props.mode}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
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
