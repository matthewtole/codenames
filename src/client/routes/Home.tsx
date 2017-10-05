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
import { ModalNewRoom } from '../components/ModalNewRoom';
import { ModalJoinRoom } from '../components/ModalJoinRoom';
import { RoomOptions, Room, RoomTag } from '../../shared/rooms';
import { History } from 'history';
import config from '../config';

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

  handleCreateRoomSubmit = (options: RoomOptions) => {
    var request = new Request(`${config.apiRoot}/api/v1/room`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        options,
        createGame: true
      }),
    });
    fetch(request).then((res) => res.json()).then((data: Room) => {
      this.props.history.push(`/room/${data.tag}`);
    });
  }

  handleJoinRoomSubmit = (tag: RoomTag) => {
    this.props.history.push(`/room/${tag}/`);
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
                <Menu.Item as="a" href="https://github.com/codenames-web" target="_blank">Source Code</Menu.Item>
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
              {/* <Button primary={true} size="huge">
                Get Started
                <Icon name="right arrow" />
              </Button> */}
            </Container>
          </Segment>
        </Visibility>

      {/* <Segment style={{ padding: '8em 0em' }} vertical={true}>
      <Grid container={true} stackable={true} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>We Help Companies and Companions</Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible. Let us delight
              your customers and empower your needs... through pure data analytics.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>We Make Bananas That Can Dance</Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered={true}
              rounded={true}
              size="large"
              src="/assets/images/wireframe/white-image.png"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        </Segment> */}
    </div>
    );
  }
}
