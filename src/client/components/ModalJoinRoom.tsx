import * as React from 'react';
import { Button, Input, Grid, Modal, Header, Segment, Divider, Icon } from 'semantic-ui-react';
import { RoomTag } from '../../shared/rooms';
import { BoardMode } from '../components/Board';

interface Props {
  isOpen: boolean;
  onSubmit: (tag: RoomTag, mode: BoardMode) => void;
  onCancel: () => void;
}

interface State {
  tag: RoomTag;
  mode: BoardMode;
}

export class ModalJoinRoom extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      tag: '',
      mode: BoardMode.Viewer,
    };
  }

  setMode = (mode: BoardMode) => {
    this.setState({ mode });
  }

  onSubmit = () => {
    if (this.state.tag.length > 0) {
      this.props.onSubmit(this.state.tag, this.state.mode);
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header as="h1">Join An Existing Room</Modal.Header>
        <Modal.Content>
          <Header as="h3">
            Room Tag
            <Header.Subheader>
              Enter the tag of the room you want to join!
            </Header.Subheader>
          </Header>
          <Input placeholder="e.g. chicken-house" size="big" style={{ width: '100%' }} />
          <Divider />

          <Header as="h3">
            Device Type
            <Header.Subheader>
              Choose if this is the controller
              (laptop, tablet, or phone used by the spy masters to play the game)
              or the viewer (TV or other large screen seen by the other players).
            </Header.Subheader>
          </Header>
          <Button.Group widths="3">
            <Button
              active={this.state.mode === BoardMode.Controller}
              onClick={() => this.setMode(BoardMode.Controller)}
            >
              Controller
            </Button>
            <Button
              active={this.state.mode === BoardMode.Viewer}
              onClick={() => this.setMode(BoardMode.Viewer)}
            >
              Viewer
            </Button>
          </Button.Group>
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
