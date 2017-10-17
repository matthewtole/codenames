import * as React from 'react';
import {
  Visibility,
  Segment,
  Container,
  Menu,
  Button,
  Header,
  Icon,
  Image,
  Grid,
} from 'semantic-ui-react';
import { History } from 'history';

import { RoomOptions, Room, RoomTag } from '../../shared/rooms';

import { ModalNewRoom } from '../components/ModalNewRoom';
import { ModalJoinRoom } from '../components/ModalJoinRoom';

import { createRoom } from '../lib/api';

interface Props {
  history: History;
}

interface State {
  modal?: string;
}

export class Home extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {};
  }

  handleCreateRoomSubmit = (options: RoomOptions, mode: string) => {
    createRoom(options).then((data: Room) => {
      this.props.history.push(`/room/${data.tag}/${mode}/`);
    });
  }

  handleJoinRoomSubmit = (tag: RoomTag, mode: string) => {
    this.props.history.push(`/room/${tag}/${mode}/`);
  }

  render() {
    return (
      <div>
        <ModalNewRoom
          isOpen={this.state.modal === 'new-room'}
          onSubmit={this.handleCreateRoomSubmit}
          onCancel={() => this.setState({ modal: undefined })}
        />
        <ModalJoinRoom
          isOpen={this.state.modal === 'join-room'}
          onSubmit={this.handleJoinRoomSubmit}
          onCancel={() => this.setState({ modal: undefined })}
        />
        <Visibility
          once={false}
        >
          <Segment
            inverted={true}
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical={true}
          >
            <Container>
              <Menu inverted={true} pointing={true} secondary={true} size="large">
                <Menu.Item as="a" active={true}>Home</Menu.Item>
                <Menu.Item as="a">About</Menu.Item>
                <Menu.Item
                  as="a"
                  href="https://github.com/matthewtole/codenames/"
                  target="_blank"
                >
                  Source Code
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as="a"
                    inverted={true}
                    onClick={() => this.setState({ modal: 'join-room' })}
                  >
                    Join Room
                  </Button>
                  <Button
                    as="a"
                    inverted={true}
                    style={{ marginLeft: '0.5em' }}
                    onClick={() => this.setState({ modal: 'new-room' })}
                  >
                    Create Room
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text={true}>
              <Header
                as="h1"
                content="Codenames 2.0"
                inverted={true}
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
              />
              <Header
                as="h2"
                content="An unofficial web based version of Codenames"
                inverted={true}
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
            </Container>
          </Segment>
        </Visibility>
    </div>
    );
  }
}
