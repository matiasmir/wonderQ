import ErrorHandler from "../middlewares/ErrorHandler";

var MD5 = require("crypto-js/md5");

export default class Message {
  messages: object; // Object mapping ids to messages.
  availableMessages: string[]; // Messages available for consumption
  MessagesInFlight: object; //Messages that have been polled by a user and are not procesed yet.
  TTL: number; // Time to live: [time in ms] This variable dictates  how long a message can be on hold by a user without being procesed before its returned to the available messages array.

  constructor() {
    this.messages = {};
    this.availableMessages = [];
    this.MessagesInFlight = {};
    this.TTL = 5000;
  }

  async save(body: string): Promise<string> {
    const id = MD5(body).toString();
    this.messages[id] = body;
    this.availableMessages.push(id);
    return id;
  }

  async poll(ammount: number): Promise<string[]> {
    const polledIds = this.availableMessages.splice(0, ammount);
    let polledMessages = [];
    for (let messageId of polledIds) {
      this.MessagesInFlight[messageId] = new Date().getTime();
      polledMessages.push({
        id: messageId,
        message: this.messages[messageId],
      });
    }
    return polledMessages;
  }

  async processMessage(id: string): Promise<string> {
    console.log("id received", id);
    console.log("messages", this.messages);
    if (Object.keys(this.messages).includes(id)) {
      delete this.messages[id];
      if (this.availableMessages.includes(id))
        this.availableMessages.splice(this.availableMessages.indexOf(id), 1);
      if (Object.keys(this.MessagesInFlight).includes(id))
        delete this.MessagesInFlight[id];

      return id;
    } else {
      return null;
    }
  }

  async checkTTL(): Promise<string> {
    let now = new Date().getTime();
    for (let messageId of Object.keys(this.MessagesInFlight)) {
      console.log("message id", messageId);
      console.log("now, messageTime", now, this.MessagesInFlight[messageId]);
      // If the messages on hold by the user has expired return it to the available messages array
      if (now - this.MessagesInFlight[messageId] >= this.TTL) {
        this.availableMessages.unshift(messageId);
        delete this.MessagesInFlight[messageId];
      }
    }
    return "Updated available messages";
  }
}
