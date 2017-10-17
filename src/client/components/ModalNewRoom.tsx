import * as React from 'react';
import { words as WordLists } from '../../shared/data/words';
import { RULE_SETS } from '../../shared/data/rules';
import { Button, Grid, Modal, Header, Segment, Divider, Icon } from 'semantic-ui-react';
import { titlecase } from '../lib/utils';
import { RoomOptions } from '../../shared/rooms';
import { BoardMode } from '../components/Board';

interface Props {
  isOpen: boolean;
  onSubmit: (options: RoomOptions, mode: BoardMode) => void;
  onCancel: () => void;
}

interface State {
  words: string;
  rules: string;
  mode: BoardMode;
}

export class ModalNewRoom extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      words: 'original',
      rules: 'standard',
      mode: BoardMode.Controller,
    };
  }

  setWordList = (words: string) => {
    this.setState({ words });
  }

  setRuleSet = (rules: string) => {
    this.setState({ rules });
  }

  setMode = (mode: BoardMode) => {
    this.setState({ mode });
  }

  onSubmit = () => {
    this.props.onSubmit(
      {
        words: this.state.words,
        rules: this.state.rules,
      },
      this.state.mode,
    );
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>Create A New Room</Modal.Header>
        <Modal.Content>

          <Header as="h3">
            Word List
            <Header.Subheader>
              Select the Codenames word list you want to use.
            </Header.Subheader>
          </Header>
          <Button.Group widths="3">
            {Object.keys(WordLists).map(list => (
              <Button
                key={list}
                active={this.state.words === list}
                onClick={() => this.setWordList(list)}
              >
                {titlecase(list)}
              </Button>
            ))}
          </Button.Group>

          <Divider />

          <Header as="h3">
            Rule Set
            <Header.Subheader>
              Select the rule set you want to use.
            </Header.Subheader>
          </Header>
          <Button.Group widths="3">
            {Object.keys(RULE_SETS).map(list => (
              <Button
                key={list}
                active={this.state.rules === list}
                onClick={() => this.setRuleSet(list)}
              >
                {titlecase(list)}
              </Button>
            ))}
          </Button.Group>

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
          <Button key="cancel" color="grey" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button key="create" color="green" onClick={this.onSubmit}>
            <Icon name="thumbs up" />
            Create Room
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
