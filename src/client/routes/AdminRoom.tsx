import * as io from 'socket.io-client';
import * as React from 'react';
import { History } from 'history';
import { Table, Container, Menu, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { Room } from '../../shared/rooms';

import { getRooms } from '../lib/api';

interface State {
  rooms?: Room[]
};

export class AdminRoom extends React.Component<{}, State> {
  private roomTag: string;

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    getRooms().then((rooms) => {
      console.log(rooms);
      this.setState({
        rooms: Object.keys(rooms).map(tag => rooms[tag]),
      });
    })
  }

  render() {
    const { rooms } = this.state;
    if (!rooms) { return null; }
    return (
      <div>
        <Segment
            inverted={true}
            textAlign="center"
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
          </Menu>
        </Container>
        </Segment>
      <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Room Tag</Table.HeaderCell>
            <Table.HeaderCell>Words</Table.HeaderCell>
            <Table.HeaderCell>Rules</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Last Accessed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          {rooms.map(room => (
            <Table.Row>
              <Table.Cell><Link to={`/room/${room.tag}/viewer/`}>{room.tag}</Link></Table.Cell>
              <Table.Cell>{room.words}</Table.Cell>
              <Table.Cell>{room.rules}</Table.Cell>
              <Table.Cell>{moment(room.createdAt).calendar()}</Table.Cell>
              <Table.Cell>{moment(room.lastAccessed).calendar()}</Table.Cell>
              {/* <Label ribbon>First</Label> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </Container>
      </div>
    )
  }
}