import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../middlewares/ErrorHandler";

export default class MessagingController {
  async test(req: Request, res: Response, next: NextFunction) {
    try {
      let availableMessages = global["messageService"].availableMessages;
      return res.status(200).json(availableMessages);
    } catch (error) {
      next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body) {
        const hash = await global["messageService"].save(req.body.message);
        return res.status(201).json({ messageId: hash });
      } else {
        throw new ErrorHandler(400, "Bad Request: Message can not be empty");
      }
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const ammountToPoll = +req.params.ammount;
      await global["messageService"].checkTTL();
      let messages = await global["messageService"].poll(ammountToPoll);
      return res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }

  async processMessage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id)
        throw new ErrorHandler(
          400,
          "You have to specify a message id in order to process it."
        );
      const messageId = await global["messageService"].processMessage(
        req.params.id
      );
      if (!messageId)
        throw new ErrorHandler(404, "The specified message does not exist.");
      return res.status(200).json({ messageId: messageId });
    } catch (error) {
      next(error);
    }
  }
}
