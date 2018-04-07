import * as React from 'react';
import './Card.css';
import { Role } from '../../lib/types';
import * as cx from 'classnames';
import { BoardMode } from './Board';

export interface CardProps {
  word: string;
  role: Role;
  revealed: boolean;
  highlighted: boolean;
  boardMode: BoardMode;
  onReveal: () => void;
  onHighlight: () => void;
}

export class Card extends React.PureComponent<CardProps, object> {
  render() {
    return (
      <div
        className={cx({
          Card: true,
          'Card--highlighted': this.props.highlighted,
          'Card--revealed': this.props.revealed,
          [`Card--${this.props.boardMode}`]: true,
        })}
        data-role={this.props.role}
        onClick={this.handleClick}
      >
        <div>{this.props.word}</div>
      </div>
    );
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (this.props.revealed) {
      return;
    }
    if (this.props.highlighted) {
      this.props.onReveal();
    } else {
      this.props.onHighlight();
    }
  }
}
