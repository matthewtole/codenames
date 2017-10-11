import * as React from 'react';
import { Button, Input, Grid, Modal, Header, Segment, Divider, Icon } from 'semantic-ui-react';
import { RoomTag } from '../../shared/rooms';

interface Props {
  isOpen: boolean;
  onSubmit: (tag: RoomTag) => void;
  onCancel: () => void;
}

interface State {
  tag: RoomTag;
}

export class ModalJoinRoom extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      tag: '',
    };
  }

  onSubmit = () => {
    if (this.state.tag.length > 0) {
      this.props.onSubmit(this.state.tag);
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Header as="h2">
            Room Tag
            <Header.Subheader>
              Enter the tag of the room you want to join!
            </Header.Subheader>
          </Header>
          <Input placeholder="e.g. chicken-house" size="big" style={{ width: '100%' }} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button color="green" onClick={this.onSubmit}>
            <Icon name="checkmark" /> Join Room
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
