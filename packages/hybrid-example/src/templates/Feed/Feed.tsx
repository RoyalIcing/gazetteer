import React from "react";

import { DataSourceResult } from "../../types";
import { Templates, DataSources } from "../../main";
import { useDataSource } from "../../root/DataSourceContext";
import { registerTemplate } from "../registry";

type FeedListData = Array<{
  type: "video" | "article";
  description: string;
}>;

export function Feed({}) {
  const feedListResult = useDataSource(
    DataSources.Feed.list
  ) as DataSourceResult<FeedListData>;

  const [counter, updateCounter] = React.useState(0);
  React.useEffect(() => {
    updateCounter(n => n + 1);
  });

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
      {counter}
    </div>
  );
}

registerTemplate({
  ...Templates.Feed,
  component: Feed
});
