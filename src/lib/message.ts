import { RulesetManager } from './ruleset';
import { RulesetName, Team } from '../redux/game/types';
import { BoardMode } from '../components/game/Board';
import { otherPlayer } from '../redux/game/utils';

type MessageData = { [key: string]: string };

export interface Message {
  header: string;
  content: string;
  team: Team;
}

const data: MessageData = require('../data/messages.json');

export class Messages {
  static get(key: string) {
    return data[key];
  }

  static render(
    team: Team,
    ruleset: RulesetName,
    key: string,
    mode: BoardMode
  ): Message {
    return {
      header: Messages.formatMessage(team, Messages.get(key)),
      content: Messages.formatMessage(
        team,
        RulesetManager.get(ruleset, key, mode)
      ),
      team: team,
    };
  }
  private static formatMessage(turn: Team, message: string) {
    return message
      .replace(
        '{% other_team %}',
        otherPlayer(turn)
          .toString()
          .toLocaleLowerCase()
      )
      .replace('{% team %}', turn.toString().toLocaleLowerCase());
  }
}
