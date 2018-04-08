import * as React from 'react';
import { ConnectedGame } from '../containers/Game';
import { RouteComponentProps } from 'react-router';
import { BoardMode } from '../components/game/Board';
import { RulesetName, DictionaryName } from '../redux/game/types';

interface Props
  extends RouteComponentProps<{
      id: string;
      mode: string;
    }> {
  ruleset: RulesetName;
  dictionary: DictionaryName;
}

export class PageGame extends React.Component<Props, {}> {
  render() {
    return (
      <ConnectedGame
        id={this.props.match.params.id}
        ruleset={this.props.ruleset}
        dictionary={this.props.dictionary}
        mode={
          this.props.match.params.mode === 'viewer'
            ? BoardMode.Viewer
            : BoardMode.Controller
        }
      />
    );
  }
}
