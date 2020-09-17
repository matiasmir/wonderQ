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
    route: "/messages/save",
    controller: MessagingController,
    action: "save",
  },
  {
    method: "get",
    route: "/messages/poll/:ammount",
    controller: MessagingController,
    action: "get",
  },
];
