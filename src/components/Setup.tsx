import * as React from 'react';
import { DictionaryName, RulesetName } from '../redux/game/types';
import { RulesetNames, RulesetManager } from '../lib/ruleset';
import { DictionaryNames, DictionaryManager } from '../lib/dictionary';

interface Props {
  dictionary: DictionaryName;
  ruleset: RulesetName;
  creatingRoom?: boolean;
  onChangeRuleset: (ruleset: RulesetName) => void;
  onChangeDictionary: (dictionary: DictionaryName) => void;
  onSubmit: () => void;
}

export class Setup extends React.Component<Props, {}> {
  render() {
    const { ruleset, dictionary, creatingRoom } = this.props;

    if (creatingRoom) {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content has-text-centered has-text-white">
            <i className="fa fa-4x fa-spinner fa-pulse" />
          </div>
        </div>
      );
    }

    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Start New Game</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            <div className="columns is-mobile is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet is-full-mobile is-one-third-widescreen ">
                <div className="box">
                  <h3 className="title is-4" style={{ marginBottom: '1rem' }}>
                    Additional Rules
                  </h3>
                  <div className="field">
                    {RulesetNames.map(name => (
                      <div className="field">
                        <input
                          className="is-checkradio"
                          id={name}
                          type="radio"
                          name={name}
                          checked={ruleset === name}
                          onChange={() => this.props.onChangeRuleset(name)}
                        />
                        <label htmlFor={name}>
                          {RulesetManager.getName(name)}
                        </label>
                        {RulesetManager.hasDescription(name) ? (
                          <p className="help">
                            {RulesetManager.getDescription(name)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <br />
                  <h3 className="title is-4" style={{ marginBottom: '1rem' }}>
                    Dictionary
                  </h3>
                  <div className="field">
                    {DictionaryNames.map(name => (
                      <div className="field">
                        <input
                          className="is-checkradio"
                          id={name}
                          type="radio"
                          name={name}
                          checked={dictionary === name}
                          onChange={() => this.props.onChangeDictionary(name)}
                        />
                        <label htmlFor={name}>
                          {DictionaryManager.getName(name)}
                        </label>
                        {DictionaryManager.hasDescription(name) ? (
                          <p className="help">
                            {DictionaryManager.getDescription(name)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <br />
                  <div className="has-text-centered">
                    <button
                      className="button is-primary is-medium"
                      onClick={() => this.props.onSubmit()}
                      style={{ width: '100%' }}
                    >
                      Start Game
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
