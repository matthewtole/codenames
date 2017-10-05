import * as React from 'react';
import { words as WordLists } from '../../shared/data/words';
import { RULE_SETS } from '../../shared/data/rules';
import { Button, Grid, Modal, Header, Segment, Divider, Icon } from 'semantic-ui-react';
import { titlecase } from '../lib/utils';
import { RoomOptions } from '../../shared/rooms';

interface Props {
  isOpen: boolean;
  onSubmit: (options: RoomOptions) => void;
  onCancel: () => void;
}

interface State {
  words: string;
  rules: string;
}

export class ModalNewRoom extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      words: 'original',
      rules: 'standard',
    };
  }

  setWordList = (words: string) => {
    this.setState({ words });
  }

  setRuleSet = (rules: string) => {
    this.setState({ rules });
  }

  onSubmit = () => {
    this.props.onSubmit({
      words: this.state.words,
      rules: this.state.rules,
    });
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>Create New Room</Modal.Header>
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
                active={this.state.rules === list}
                onClick={() => this.setRuleSet(list)}
              >
                {titlecase(list)}
              </Button>
            ))}
          </Button.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button color="green" onClick={this.onSubmit}>
            <Icon name="thumbs up" />
            Create Room
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
