import { v4 as uuidv4 } from "uuid";

export default class Message {
  messages: object;
  availableMessages: string[];
  MessagesInFlight: string[];
  TTL: number; // Time to live: This dictates how long a message can be hold without being procesed before its returned to the available messages array.
  constructor() {
    this.messages = {};
    this.availableMessages = [];
    this.MessagesInFlight = [];
  }

  async save(body: string): Promise<string> {
    const uuid = uuidv4();
    this.messages[uuid] = body;
    this.availableMessages.push(uuid);
    return uuid;
  }

  async poll(ammount: number): Promise<string[]> {
    const polledMessages = this.availableMessages.slice(0, ammount);
    this.MessagesInFlight = polledMessages;
    return polledMessages;
  }

  async processMessage(id: string) {}
}
