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
            .map((_: number, row: number) => (
              <div className="BoardRow" key={`row_${row}`}>
                {Array(this.props.width)
                  .fill(0)
                  .map((__: number, col: number) => (
                    <CardComponent
                      key={`card_${row}_${col}`}
                      word={this.getWord({ row, col })}
                      role={this.getRole({ row, col })}
                      revealed={this.isRevealed({ row, col })}
                      highlighted={this.isHighlighted({ row, col })}
                      onHighlight={() => {
                        this.highlightCard({ row: row, col });
                      }}
                      onReveal={() => {
                        this.revealCard({ row, col });
                      }}
                      boardMode={this.props.mode}
                      isGameOver={this.props.isGameOver}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  }

  private getWord = (card: Coordinate): string => {
    return this.props.cards[this.coordinateToIndex(card)].word;
  }

  private getRole = (card: Coordinate): Role => {
    return this.props.cards[this.coordinateToIndex(card)].role;
  }

  private isRevealed = (card: Coordinate): boolean => {
    return this.props.revealedCards.indexOf(this.coordinateToIndex(card)) >= 0;
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
