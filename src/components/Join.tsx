import * as React from 'react';

export interface JoinProps {
  error?: string;
  onSubmit: (code: string) => void;
}

interface State {
  code: string;
}

const VALID_CODE = /^[0-9]{6}$/;

export class Join extends React.Component<JoinProps, State> {
  constructor(props: JoinProps) {
    super(props);

    this.state = {
      code: '',
    };
  }

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          {this.props.error && (
            <div className="notification is-danger">{this.props.error}</div>
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
            <input
              type="submit"
              disabled={!this.isValidCode}
              className="button is-success is-medium"
              onClick={this.handleSubmit}
              style={{ width: '100%' }}
              value="Join Game"
            />
          </div>
        </form>
      </div>
    );
  }

  private get isValidCode(): boolean {
    return VALID_CODE.test(this.state.code);
  }

  private handleSubmit = (
    event: React.MouseEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (!this.isValidCode) {
      return;
    }

    this.props.onSubmit(this.state.code);
  }

  private handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      code: event.target.value,
    });
  }
}
