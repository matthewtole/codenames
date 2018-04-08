type MessageData = { [key: string]: string };

const data: MessageData = require('../data/messages.json');

export class Messages {
  static get(key: string) {
    return data[key];
  }
}
