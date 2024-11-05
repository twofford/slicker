import Channel from "./channel";
import Message from "./message";
import User from "./user";
import ChannelMembership from "./channel_membership";

Channel.hasMany(ChannelMembership, {
  as: "channel_memberships",
  foreignKey: "channel_id",
});

User.hasMany(ChannelMembership, {
  as: "channel_memberships",
  foreignKey: "user_id",
});

User.hasMany(Message, {
  as: "messages",
  foreignKey: "user_id",
});

Message.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
});

Channel.hasMany(Message, {
  as: "messages",
  foreignKey: "channel_id",
});

Message.belongsTo(Channel, {
  as: "channels",
  foreignKey: "channel_id",
});

export { Channel, Message, User, ChannelMembership };
