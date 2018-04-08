import * as React from 'react';
import * as cx from 'classnames';
import { DictionaryName, RulesetName } from '../redux/game/types';

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
    const rulesets = {
      [RulesetName.STANDARD]: 'None',
      [RulesetName.DRINKING]: 'Drinking',
      [RulesetName.STRIP]: 'Strip',
    };

    const dictionarys = {
      [DictionaryName.ORIGINAL]: 'Original',
      [DictionaryName.UNDERCOVER]: 'Undercover',
    };

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
        <section className="hero is-primary is">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Codenames</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            <div className="columns is-mobile is-centered">
              <div className="column is-half is-narrow">
                <div className="box">
                  <h3 className="title is-4">Additional Rules</h3>
                  <div className="buttons has-addons">
                    {Object.keys(rulesets).map(key => (
                      <span
                        key={key}
                        onClick={() =>
                          this.props.onChangeRuleset(key as RulesetName)
                        }
                        className={cx({
                          button: true,
                          'is-selected': ruleset === key,
                          'is-primary': ruleset === key,
                        })}
                      >
                        {rulesets[key]}
                      </span>
                    ))}
                  </div>

                  <h3 className="title is-4">Word List</h3>
                  <div className="buttons has-addons">
                    {Object.keys(dictionarys).map(key => (
                      <span
                        key={key}
                        onClick={() =>
                          this.props.onChangeDictionary(key as DictionaryName)
                        }
                        className={cx({
                          button: true,
                          'is-selected': dictionary === key,
                          'is-primary': dictionary === key,
                        })}
                      >
                        {dictionarys[key]}
                      </span>
                    ))}
                  </div>
                  <button
                    className="button"
                    onClick={() => this.props.onSubmit()}
                  >
                    Create Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
