import { DataTypes } from "sequelize";
import sequelize from "../orm";
import Channel from "./channel";
import User from "./user";

const Message = sequelize.define(
  "Message",
  {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
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
    tableName: "messages",
    createdAt: "created_at",
    updatedAt: "updated_at",
    // hooks: {
    //   async beforeCreate(message) {
    //     const channel = await Channel.findOne({
    //       where: { id: message.getDataValue("channel_id") },
    //     });
    //     if (channel == null) {
    //       throw new Error("Channel does not exist")
    //     }
    //     const user = await User.findOne({
    //       where: { id: message.getDataValue("user_id") },
    //     });
    //     if (user == null) {
    //       throw new Error("User does not exist")
    //     }
    //   },
    // },
  }
);

export default Message;
