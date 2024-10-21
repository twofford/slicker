interface Routes {
  getUserChannels: string;
  getChannelMessages: string;
}

const routes: Routes = {
  getUserChannels: "/channels/:userId",
  getChannelMessages: "/messages/:channelId",
};

export default routes;
