import * as React from 'react';
import './Card.css';
import { Role } from '../../shared/game';

export interface CardProps {
  word: string;
  role: Role;
  revealed: boolean;
  highlighted: boolean;
  onReveal: () => void;
  onHighlight: () => void;
}

export class Card extends React.Component<CardProps, object> {
  render() {
    const classes = ['Card'];
    if (this.props.highlighted) { classes.push('Card--highlighted'); }
    if (this.props.revealed) { classes.push('Card--revealed'); }
    return (
      <div className={classes.join(' ')} data-role={Role[this.props.role]} onClick={this.handleClick}>
        {this.props.word}
      </div>
    );
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (this.props.highlighted) {
      this.props.onReveal();
    } else if (!this.props.revealed) {
      this.props.onHighlight();
    }
  }
}
