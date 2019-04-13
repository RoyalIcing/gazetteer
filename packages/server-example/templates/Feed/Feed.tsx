import React from "react";

import { DataSourceResult } from "../../types";
import { DataSources } from "../../main";
import { useDataSource } from "../../root/DataSourceContext";

type FeedListData = Array<{
  type: "video" | "article";
  description: string;
}>;

export function Feed({}) {
  const feedListResult = useDataSource(
    DataSources.Feed.list
  ) as DataSourceResult<FeedListData>;

  return (
    <div>
      <h1>Feed</h1>
      {feedListResult.loaded && feedListResult.data && (
        <>
          <ul>
            {feedListResult.data.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
