import { GazetteerRoute } from "./types";

export const DataSources = {
  Feed: {
    list: Symbol("Data.Feed.list")
  },
  Viewer: {
    profile: Symbol("Data.Viewer.profile")
  }
};

export const Templates = {
  Feed: Symbol("Templates.Feed"),
  EditAccount: Symbol("Templates.EditAccount")
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
];
