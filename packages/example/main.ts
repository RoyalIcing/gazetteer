import { GazetteerRoute, DataSourceIdentifier, uniqueDataSource } from "./types";

export const DataSources = {
  Feed: {
    list: uniqueDataSource("Data.Feed.list")
  },
  Viewer: {
    profile: uniqueDataSource("Data.Viewer.profile")
  },
  URLParams: {
    username: { type: "urlParam", param: "username" } as DataSourceIdentifier
  }
};

export const Templates = {
  Feed: Symbol.for("Templates.Feed"),
  EditAccount: Symbol.for("Templates.EditAccount"),
  UserProfile: Symbol.for("Templates.UserProfile")
};

export const routes: Array<GazetteerRoute> = [
  {
    paths: ["/feed"],
    dataSources: [DataSources.Feed.list, DataSources.Viewer.profile],
    templateType: "react",
    template: Templates.Feed
  },
  {
    paths: ["/account"],
    dataSources: [DataSources.Viewer.profile],
    templateType: "react",
    template: Templates.EditAccount
  },
  {
    paths: ["/user/{username}"],
    // paths: [["/user/", String]],
    dataSources: [DataSources.URLParams.username],
    templateType: "react",
    template: Templates.UserProfile
  }
];
