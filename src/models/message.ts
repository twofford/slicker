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
      references: {
        model: Channel,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { tableName: "messages", createdAt: "created_at", updatedAt: "updated_at" }
);

export default Message;
