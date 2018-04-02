import * as React from 'react';

interface State {
  wordlist: string;
  ruleset: string;
}

export class GameSetupPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      wordlist: 'original',
      ruleset: 'standard',
    };
  }

  setRule(key: string) {
    return () => {
      this.setState({
        ruleset: key,
      });
    };
  }

  setWordList(key: string) {
    return () => {
      this.setState({
        wordlist: key,
      });
    };
  }

  render() {
    const rulesets = {
      default: 'None',
      drinking: 'Drinking',
      strip: 'Strip',
    };

    const wordlists = {
      original: 'Original',
      undercover: 'Undercover',
    };

    return (
      <div className="container is-fluid">
        <section className="section">
          <div className="columns is-mobile is-centered">
            <div className="column is-half is-narrow">
              <div className="box">
                <div>
                  <div className="field">
                    <label className="label">Additional Rules</label>
                    <div className="control">
                      {Object.keys(rulesets).map(key => [
                        <input
                          key={key + '-input'}
                          className="is-checkradio"
                          id={`ruleset-${key}`}
                          type="radio"
                          name="ruleset"
                          checked={this.state.ruleset === key}
                          onChange={this.setRule(key)}
                        />,
                        <label
                          id={`ruleset-${key}`}
                          key={key + '-label'}
                          onClick={this.setRule(key)}
                        >
                          {rulesets[key]}
                        </label>,
                      ])}
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Word List</label>
                    <div className="control">
                      {Object.keys(wordlists).map(key => [
                        <input
                          key={key + '-input'}
                          className="is-checkradio"
                          id={`wordlist-${key}`}
                          type="radio"
                          name="wordlist"
                          checked={this.state.wordlist === key}
                          onChange={this.setWordList(key)}
                        />,
                        <label
                          id={`wordlist-${key}`}
                          key={key + '-label'}
                          onChange={this.setWordList(key)}
                        >
                          {wordlists[key]}
                        </label>,
                      ])}
                    </div>
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
