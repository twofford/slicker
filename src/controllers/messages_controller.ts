import { Request, Response, NextFunction } from "express";
import Message from "../models/message";
import Channel from "../models/channel";

async function getChannelMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const channelId = req.params.channelId;
    const channelMessages = await Message.findAll({
      include: {
        model: Channel,
        required: true,
        where: {
          id: channelId,
        },
      },
    });
    res.json(channelMessages);
  } catch (err) {
    next(err);
  }
}

export { getChannelMessages };
