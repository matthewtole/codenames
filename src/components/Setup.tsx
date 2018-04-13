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
      <div className="box">
        <h3 className="title is-4" style={{ marginBottom: '1rem' }}>
          Dictionary
        </h3>
        <div className="field">
          {DictionaryNames.map(name => (
            <div className="field" key={name}>
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
                {this.renderDictionaryTooltip(name)}
              </label>
            </div>
          ))}
        </div>
        <br />

        <h3 className="title is-4" style={{ marginBottom: '1rem' }}>
          Additional Rules
        </h3>
        <div className="field">
          {RulesetNames.map(name => (
            <div className="field" key={name}>
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
                {this.renderRulesetTooltip(name)}
              </label>
            </div>
          ))}
        </div>
        <br />

        <div className="has-text-centered">
          <button
            className="button is-success is-medium"
            onClick={() => this.props.onSubmit()}
            style={{ width: '100%' }}
          >
            Start Game &rarr;
          </button>
        </div>
      </div>
    );
  }

  private renderDictionaryTooltip = (dictionary: DictionaryName) => {
    if (!DictionaryManager.hasDescription(dictionary)) {
      return null;
    }
    return this.renderTooltip(DictionaryManager.getDescription(dictionary));
  }

  private renderRulesetTooltip = (ruleset: RulesetName) => {
    if (!RulesetManager.hasDescription(ruleset)) {
      return null;
    }
    return this.renderTooltip(RulesetManager.getDescription(ruleset));
  }

  private renderTooltip = (content: string) => {
    return (
      <span
        className="icon is-small tooltip is-tooltip-right"
        data-tooltip={content}
      >
        <i className="fa fa-question-circle" />
      </span>
    );
  }
}
