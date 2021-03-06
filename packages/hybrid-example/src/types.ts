// Data source identifiers

export type DataSourceIdentifier =
  | { type: "symbol"; symbol: symbol }
  | { type: "urlParam"; param: string };

export function uniqueDataSource(
  from: string
): { type: "symbol"; symbol: symbol } {
  return { type: "symbol", symbol: Symbol.for(`DataSource.${from}`) };
}

export function urlParam(
  paramName: string
): { type: "urlParam"; param: string } {
  return { type: "urlParam", param: paramName };
}

export function dataSourceIdentifierToString(
  identifier: DataSourceIdentifier
): string {
  if (identifier.type === "symbol") {
    return identifier.symbol.toString();
  } else if (identifier.type === "urlParam") {
    return `urlParam:${identifier.param}`;
  } else {
    throw new Error("Unknown data source identifier");
  }
}

// Templates

export type TemplateIdentifier = {
  type: "template";
  name: string;
  framework: "react" | "vue";
};

export function reactTemplate(
  componentName: string
): { type: "template"; name: string; framework: "react" } {
  return {
    type: "template",
    name: componentName,
    framework: "react"
  };
}

export function vueTemplate(
  componentName: string
): { type: "template"; name: string; framework: "vue" } {
  return {
    type: "template",
    name: componentName,
    framework: "vue"
  };
}

export type DataSourceResult<Data = {}> =
  | { data?: Data; error?: Error; loaded: true }
  | { loaded: false };

export interface GazetteerRoute {
  paths: Array<string>;
  dataSources: Array<DataSourceIdentifier>;
  template: TemplateIdentifier;
}
