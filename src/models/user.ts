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
      set(value: string) {
        if (value.length < 10) {
          throw new Error("Password must be at least 10 characters long");
        } else {
          this.setDataValue("password", hashString(value, "sha256"));
        }
      },
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "users", createdAt: "created_at", updatedAt: "updated_at" }
);

export default User;
