import React, { useContext } from "react";

import { DataSourceResult } from "../types";

export const DataSourceContext = React.createContext(
  function<Data>(id: symbol) {
    return { loaded: false } as DataSourceResult<Data>
  }
);

export function useDataSource<Data>(id: symbol): DataSourceResult<Data> {
  const resultForDataSource = useContext(DataSourceContext);
  return resultForDataSource(id);
}
