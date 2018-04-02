import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';
import { BoardMode } from './Board';

interface Props {
  isShown: boolean;
  onClose: () => void;
  roomId: string;
  boardMode: BoardMode;
}

export class GameMenu extends React.PureComponent<Props, {}> {
  render() {
    const { isShown, onClose, roomId, boardMode } = this.props;

    const rulesets = {
      standard: 'None',
      drinking: 'Drinking',
      strip: 'Strip',
    };

    const wordlists = {
      original: 'Original',
      undercover: 'Undercover',
    };

    return (
      <div className={cx({ modal: true, 'is-active': isShown })}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <aside className="menu">
              <ul className="menu-list">
                <li>
                  <Link to="/">
                    <i className="fa fa-arrow-left fa-fw" /> Exit Game
                  </Link>
                </li>
                {boardMode === BoardMode.Viewer ? (
                  <li>
                    <Link to={`/room/${roomId}/controller`}>
                      <i className="fa fa-eye fa-fw" /> Switch to Controller
                      Mode
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to={`/room/${roomId}/viewer`}>
                      <i className="fa fa-eye fa-fw" /> Switch to Viewer Mode
                    </Link>
                  </li>
                )}
              </ul>
              <p className="menu-label">Change Ruleset</p>
              <ul className="menu-list">
                {Object.keys(rulesets).map(key => (
                  <li key={key}>
                    <a>{rulesets[key]}</a>
                  </li>
                ))}
              </ul>
              <p className="menu-label">Change Word List</p>
              <ul className="menu-list">
                {Object.keys(wordlists).map(key => (
                  <li key={key}>
                    <a>{wordlists[key]}</a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={onClose}
        />;
      </div>
    );
  }
}
