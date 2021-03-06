import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';
import { BoardMode } from './Board';
import { DictionaryNames, DictionaryManager } from '../../lib/dictionary';
import { RulesetNames, RulesetManager } from '../../lib/ruleset';
import { DictionaryName, RulesetName } from '../../redux/game/types';

export interface GameMenuProps {
  isShown: boolean;
  onClose: () => void;
  roomId: string;
  boardMode: BoardMode;
  ruleset: RulesetName;
  dictionary: DictionaryName;
  setDictionary: (dictionary: DictionaryName) => void;
  setRuleset: (ruleset: RulesetName) => void;
  generateCode: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  isFullscreen: boolean;
}

export class GameMenu extends React.PureComponent<GameMenuProps, {}> {
  render() {
    const {
      isShown,
      onClose,
      roomId,
      boardMode,
      ruleset,
      dictionary,
      setDictionary,
      setRuleset,
      generateCode,
      enterFullscreen,
      exitFullscreen,
      isFullscreen,
    } = this.props;

    return (
      <div className={cx({ modal: true, 'is-active': isShown })}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <aside className="menu">
              <ul className="menu-list">
                <li>
                  <a onClick={() => generateCode()}>Generate Room Code</a>
                </li>
                {boardMode === BoardMode.VIEWER ? (
                  <li>
                    <Link to={`/room/${roomId}/controller`} onClick={onClose}>
                      Switch to Controller Mode
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to={`/room/${roomId}/viewer`} onClick={onClose}>
                      Switch to Viewer Mode
                    </Link>
                  </li>
                )}

                <li>
                  {isFullscreen ? (
                    <a onClick={() => exitFullscreen()}>Exit Fullscreen</a>
                  ) : (
                    <a onClick={() => enterFullscreen()}>Go Fullscreen</a>
                  )}
                </li>
              </ul>
              <p className="menu-label">Change Ruleset</p>
              <ul className="menu-list">
                {RulesetNames.map(name => (
                  <li key={name}>
                    <a
                      className={cx({ 'is-active': ruleset === name })}
                      onClick={() => setRuleset(name)}
                    >
                      {RulesetManager.getName(name)}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="menu-label">Change Word List</p>
              <ul className="menu-list">
                {DictionaryNames.map(name => (
                  <li key={name}>
                    <a
                      className={cx({ 'is-active': dictionary === name })}
                      onClick={() => setDictionary(name)}
                    >
                      {DictionaryManager.getName(name)}
                    </a>
                  </li>
                ))}
              </ul>
              <hr />
              <ul className="menu-list">
                <li>
                  <Link to="/">
                    <i className="fa fa-arrow-left fa-fw" /> Exit Game
                  </Link>
                </li>
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
