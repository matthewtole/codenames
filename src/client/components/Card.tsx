import * as React from 'react';
import './Card.css';
import { Role } from '../../shared/game';
import * as cx from 'classnames';

export interface CardProps {
  word: string;
  role: Role;
  revealed: boolean;
  highlighted: boolean;
  onReveal: () => void;
  onHighlight: () => void;
}

export class Card extends React.PureComponent<CardProps, object> {
  render() {
    return (
      <div
        className={
          cx({
            Card: true,
            'Card--highlighted': this.props.highlighted,
            'Card--revealed': this.props.revealed,
          })
        }
        data-role={Role[this.props.role]}
        onClick={this.handleClick}
      >
        {this.props.word}
      </div>
    );
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (this.props.revealed) { return; }
    if (this.props.highlighted) {
      this.props.onReveal();
    } else {
      this.props.onHighlight();
    }
  }
}
