import { DataTypes } from "sequelize";
import sequelize from "../orm";
import { hash } from "crypto";
import { convertStringToBinary } from "../utils/string_utils";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value: String) {
        this.setDataValue(
          "password",
          hash("sha256", convertStringToBinary(value))
        );
      },
      allowNull: false,
    },

    session_token: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { tableName: "user", createdAt: "created_at", updatedAt: "updated_at" }
);

export default User;
