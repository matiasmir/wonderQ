import { METHODS } from "http";
import Message from "../services/Message";

var MD5 = require("crypto-js/md5");
let message;
let data;
let hash;

beforeAll(() => {
  message = new Message();
  data = "testMessage";
  hash = MD5(data).toString();
});

describe("Save message", () => {
  it("Responds with id", async () => {
    const response = await message.save(data);
    expect(response).toEqual(hash);
  });
});

describe("Poll message", () => {
  it("Returns an array", async () => {
    const messages = await message.poll(1);
    expect(messages.length).toEqual(1);
  });
});

describe("Delete message", () => {
  it("Returns id of deleted message", async () => {
    const deletedMessage = await message.processMessage(hash);
    expect(deletedMessage).toEqual(hash);
  });
});
