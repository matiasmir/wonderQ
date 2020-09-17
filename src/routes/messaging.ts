import MessagingController from "../controllers/MessagingController";
export default [
  {
    method: "get",
    route: "/test",
    controller: MessagingController,
    action: "test",
  },
  {
    method: "post",
    route: "/messages",
    controller: MessagingController,
    action: "save",
  },
  {
    method: "get",
    route: "/messages/poll/:ammount",
    controller: MessagingController,
    action: "get",
  },
  {
    method: "delete",
    route: "/messages/process/:id",
    controller: MessagingController,
    action: "processMessage",
  },
];
