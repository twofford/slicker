import { DataTypes } from "sequelize";
import sequelize from "../orm";
import { hashString } from "../utils/string_utils";

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
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      afterValidate(user) {
        const password = user.getDataValue("password");
        if (password.length < 10) {
          throw new Error("Password must be at least 10 characters long");
        } else {
          user.setDataValue("password", hashString(password, "sha256"))
        }
      },
    },
  }
);

export default User;
