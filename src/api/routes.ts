interface Routes {
  getUserChannels: string;
  getChannelMessages: string;
  getAllUsers: string;
  createUser: string;
}

const routes: Routes = {
  getUserChannels: "/channels/:userId",
  getChannelMessages: "/messages/:channelId",
  getAllUsers: "/users",
  createUser: "/users"
};

export default routes;
