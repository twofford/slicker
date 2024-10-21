import { Request, Response, NextFunction } from "express";
import { Message } from "../models/models";

async function getChannelMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const channelId = req.params.channelId;
    const channelMessages = await Message.findAll({
      where: {
        channel_id: channelId
      }
    })
    res.json(channelMessages);
  } catch (err) {
    next(err);
  }
}

export { getChannelMessages };
