import * as React from 'react';
import './RoomCode.scss';

export interface RoomCodeProps {
  code: string;
  onClose: () => void;
}

export class RoomCode extends React.Component<RoomCodeProps, {}> {
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
                <h1 className="title has-text-white">{code}</h1>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
