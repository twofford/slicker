import { Request, Response, NextFunction } from "express";
import Channel from "../models/channel";
import ChannelMembership from "../models/channel_membership";

async function getUserChannels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const userChannels = await Channel.findAll({
      include: {
        model: ChannelMembership,
        required: true,
        where: {
          user_id: userId,
        },
      },
    });
    res.json(userChannels);
  } catch (err) {
    next(err);
  }
}

export { getUserChannels };
