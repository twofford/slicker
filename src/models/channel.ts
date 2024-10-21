import { DataTypes } from "sequelize";
import sequelize from "../orm";

const Channel = sequelize.define(
  "Channel",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    topic: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["public", "private", "dm"]],
      },
    },
  },
  { tableName: "channel", createdAt: "created_at", updatedAt: "updated_at" }
);

export default Channel;
