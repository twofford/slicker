import { DataTypes } from "sequelize";
import sequelize from "../orm";
import Channel from "./channel";
import User from "./user";

const ChannelMembership = sequelize.define(
  "ChannelMembership",
  {
    // TODO: check channel exists in beforeCreate hook
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Channel,
        key: "id",
      },
    },
    // TODO: check user exists in beforeCreate hook
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
  }
);

export default ChannelMembership;