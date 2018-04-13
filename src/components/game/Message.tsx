import * as React from 'react';
import './Message.scss';
import { Message } from '../../lib/message';

interface Props {
  message: Message;
  onClose: () => void;
}

interface State {}

export class ModalMessage extends React.Component<Props, State> {
  render() {
    const { message } = this.props;
    return (
      <div
        className={`game__message modal is-active game__message--${
          message.team
        }`}
        onClick={() => this.props.onClose()}
      >
        <div className="modal-background" />
        <div className="modal-content">
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title has-text-white">{message.header}</h1>
                <h2 className="subtitle has-text-white">{message.content}</h2>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
