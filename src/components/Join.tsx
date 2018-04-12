import * as React from 'react';

export interface JoinProps {
  error?: string;
  onSubmit: (code: string) => void;
}

interface State {
  code: string;
}

export class Join extends React.Component<JoinProps, State> {
  constructor(props: JoinProps) {
    super(props);

    this.state = {
      code: '',
    };
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Join Existing Game</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container is-fluid">
            <div className="columns is-mobile is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet is-full-mobile is-one-third-widescreen ">
                <div className="box">
                  {this.props.error && (
                    <div className="notification is-danger">
                      {this.props.error}
                    </div>
                  )}
                  <div className="control">
                    <input
                      className="input has-text-centered is-large"
                      type="tel"
                      placeholder="Room Code"
                      value={this.state.code}
                      onChange={this.handleCodeChange}
                    />
                  </div>

                  <br />
                  <div className="has-text-centered">
                    <button
                      disabled={!this.state.code.length}
                      className="button is-primary is-medium"
                      onClick={() => onSubmit(this.state.code)}
                      style={{ width: '100%' }}
                    >
                      Join Game
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

  private handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      code: event.target.value,
    });
  }
}
