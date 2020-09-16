import { v4 as uuidv4 } from "uuid";

export default class Message {
  messages: object;
  availableMessages: string[];
  MessagesInFlight: object;
  TTL: number; // Time to live: [time in ms] This dictates how long a message can be hold without being procesed before its returned to the available messages array.
  constructor() {
    this.messages = {};
    this.availableMessages = [];
    this.MessagesInFlight = {};
    this.TTL = 60000;
  }

  async save(body: string): Promise<string> {
    const uuid = uuidv4();
    this.messages[uuid] = body;
    this.availableMessages.push(uuid);
    return uuid;
  }

  async poll(ammount: number): Promise<string[]> {
    const polledIds = this.availableMessages.slice(0, ammount);
    let polledMessages = [];
    for (let messageId of polledIds) {
      this.MessagesInFlight[messageId] = new Date().getTime();
      polledMessages.push(this.availableMessages[messageId]);
    }
    return polledMessages;
  }

  async processMessage(id: string) {
    delete this.messages[id];
    if (this.availableMessages.includes[id])
      this.availableMessages.splice(this.availableMessages.indexOf[id], 1);
    if (Object(this.MessagesInFlight).keys().includes[id])
      delete this.MessagesInFlight[id];

    return `Message ${id} proccesed correctly.`;
  }

  async checkTTL() {
    let now = new Date().getTime();
    for (let messageId of Object(this.MessagesInFlight).keys()) {
      // If the messages on hold by the user has expired return it to the available messages array
      if (now - this.MessagesInFlight[messageId] <= this.TTL * -1) {
        this.availableMessages.unshift(messageId);
        delete this.MessagesInFlight[messageId];
      }
    }
  }
}
