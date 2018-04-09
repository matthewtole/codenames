import * as React from 'react';
import './RoomCode.css';

interface Props {
  code: string;
  onClose: () => void;
}

interface State {}

export class ModalRoomCode extends React.Component<Props, State> {
  render() {
    const { code } = this.props;
    return (
      <div
        className="game__room-code modal is-active"
        onClick={() => this.props.onClose()}
      >
        <div className="modal-background" />
        <div className="modal-content">
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title has-text-white">Room Code: {code}</h1>
                {/* <h2 className="subtitle has-text-white"></h2> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
