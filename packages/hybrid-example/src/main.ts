import {
  GazetteerRoute,
  uniqueDataSource,
  urlParam,
  reactTemplate,
  vueTemplate
} from "./types";

export const DataSources = {
  Feed: {
    list: uniqueDataSource("Feed.list")
  },
  Viewer: {
    profile: uniqueDataSource("Viewer.profile")
  },
  URLParams: {
    username: urlParam("username")
  }
};

export const Templates = {
  Feed: reactTemplate("Feed"),
  FeedVue: vueTemplate("FeedVue"),
  EditAccount: reactTemplate("EditAccount"),
  UserProfile: reactTemplate("UserProfile")
};

export const routes: Array<GazetteerRoute> = [
  {
    paths: ["/feed"],
    dataSources: [DataSources.Feed.list, DataSources.Viewer.profile],
    template: Templates.Feed
  },
  {
    paths: ["/feed-vue"],
    dataSources: [DataSources.Feed.list, DataSources.Viewer.profile],
    template: Templates.FeedVue
  },
  {
    paths: ["/account"],
    dataSources: [DataSources.Viewer.profile],
    template: Templates.EditAccount
  },
  {
    paths: ["/user/{username}"],
    // paths: [["/user/", /[^\W0-9]\w+/]],
    // paths: [["/user/", p.string]],
    // paths: [["/user/", String]],
    dataSources: [DataSources.URLParams.username],
    template: Templates.UserProfile
  }
];
