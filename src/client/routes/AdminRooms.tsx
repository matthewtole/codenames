import * as io from 'socket.io-client';
import * as React from 'react';
import { History } from 'history';
import { Table, Container, Menu, Button, Segment, Progress } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { Room } from '../../shared/rooms';

import { getRooms } from '../lib/api';

interface State {
  loading: boolean;
  rooms?: Room[];
}

export class AdminRooms extends React.Component<{}, State> {
  private roomTag: string;
  private updateTimer?: number;

  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.reloadRooms();
    this.scheduleUpdate();
  }

  componentWillUnmount() {
    clearTimeout(this.updateTimer);
  }

  private reloadRooms() {
    this.setState({
      loading: true,
    });
    getRooms().then((rooms) => {
      this.setState({
        loading: false,
        rooms: Object.keys(rooms).map(tag => rooms[tag]),
      });
    });
    this.scheduleUpdate();
  }

  private scheduleUpdate() {
    this.updateTimer = setTimeout(() => this.reloadRooms(), 1000);
  }

  render() {
    const { rooms } = this.state;
    if (rooms === undefined) { return null; }
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
        <Segment loading={this.state.loading} vertical={true} basic={true}>

          <Container>
            <Table celled={true} columns={5}>
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
                  <Table.Row key={`room:${room.tag}`}>
                    <Table.Cell>
                      <Link to={`/admin/room/${room.tag}/`}>{room.tag}</Link>
                    </Table.Cell>
                    <Table.Cell>{room.words}</Table.Cell>
                    <Table.Cell>{room.rules}</Table.Cell>
                    <Table.Cell>{moment(room.createdAt).calendar()}</Table.Cell>
                    <Table.Cell>{moment(room.lastAccessed).calendar()}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        </Segment>
      </div>
    );
  }
}
