import * as React from 'react';
import './Card.scss';
import { Role } from '../../redux/game/types';
import * as cx from 'classnames';
import { BoardMode } from './Board';

export interface CardProps {
  word: string;
  role: Role;
  revealed: boolean;
  highlighted: boolean;
  boardMode: BoardMode;
  isGameOver: boolean;
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
          'Card--game-over': this.props.isGameOver,
          [`Card--${this.props.boardMode.toLowerCase()}`]: true,
        })}
        data-role={this.props.role}
        onClick={this.handleClick}
      >
        <div>
          {this.props.word}
          {this.renderIcon()}
        </div>
      </div>
    );
  }

  renderIcon() {
    switch (this.props.role) {
      case Role.BLUE_SPY:
        return <i className="fa fa-tint" />;
      case Role.RED_SPY:
        return <i className="fa fa-fire" />;
      case Role.ASSASSIN:
        return <i className="fa fa-bullseye" />;
      case Role.BYSTANDER:
        return <i className="fa fa-child" />;
      default:
        return null;
    }
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
