export type DataSourceResult<Data = {}> =
  | { data?: Data; error?: Error, loaded: true }
  | { loaded: false };

export interface GazetteerRoute {
  paths: Array<string>,
  dataSources: Array<symbol>,
  templateType: "react",
  template: symbol
}
