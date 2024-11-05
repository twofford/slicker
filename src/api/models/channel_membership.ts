import { DataTypes } from "sequelize";
import sequelize from "../orm";
import Channel from "./channel";
import User from "./user";

const ChannelMembership = sequelize.define(
  "ChannelMembership",
  {
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Channel,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "channel_memberships",
    createdAt: "created_at",
    updatedAt: "updated_at",
    // hooks: {
    //   async beforeCreate(channelMembership) {
    //     const channel = Channel.findOne({
    //       where: { id: channelMembership.getDataValue("channel_id") },
    //     });
    //     if (channel == null) {
    //       throw new Error("Channel does not exist");
    //     }
    //     const user = User.findOne({
    //       where: { id: channelMembership.getDataValue("user_id") },
    //     });
    //     if (user == null) {
    //       throw new Error("User does not exist");
    //     }
    //   },
    // },
  }
);

export default ChannelMembership;
