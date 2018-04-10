import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router-dom';
import { BoardMode } from './Board';
import { DictionaryNames, DictionaryManager } from '../../lib/dictionary';
import { RulesetNames, RulesetManager } from '../../lib/ruleset';
import { DictionaryName, RulesetName } from '../../redux/game/types';

interface Props {
  isShown: boolean;
  onClose: () => void;
  roomId: string;
  boardMode: BoardMode;
  ruleset: RulesetName;
  dictionary: DictionaryName;
  setDictionary: (dictionary: DictionaryName) => void;
  setRuleset: (ruleset: RulesetName) => void;
  generateCode: () => void;
}

export class GameMenu extends React.PureComponent<Props, {}> {
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
