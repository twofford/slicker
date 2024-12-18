import { Request, Response, NextFunction } from "express";
import { Channel, ChannelMembership } from "../models/models";

async function getUserChannels(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.params.userId;
    const userChannels = await Channel.findAll({
      attributes: ["title", "topic", "description", "type"],
      include: {
        model: ChannelMembership,
        as: "channel_memberships",
        attributes: [],
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
