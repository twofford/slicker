import { DataTypes } from "sequelize";
import sequelize from "@src/orm";
import { hash } from "crypto";
import { convertStringToBinary } from "@utils/string_utils";

const Channel = sequelize.define("Channel", {
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
});

const Message = sequelize.define("Message", {
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const User = sequelize.define("User", {
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

  sessionToken: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Channel.hasMany(Message);
Channel.belongsToMany(User, { through: "ChannelMemberships" });

Message.belongsTo(Channel);
Message.belongsTo(User);

User.belongsToMany(Channel, { through: "ChannelMembership" });
User.hasMany(Message);

export { Channel, Message, User };
