import * as React from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { Message } from '../../shared/game';

interface Props {
  message: Message;
  onClose: () => void;
}

interface State {
}

export class ModalMessage extends React.Component<Props, State> {
  render() {
    if (this.props.message === undefined) { return null; }
    return (
      <Modal
        open={this.props.message !== undefined}
        basic={true} size="small"
        onClose={this.props.onClose}
      >
        <Modal.Header
          as="h2"
          size="huge"
          textAlign="center"
        >
          {this.props.message.header}
        </Modal.Header>
        <Modal.Content>
          <p>{this.props.message.content}</p>
        </Modal.Content>
      </Modal>
    );
  }
}
