import * as Path from "path";
import * as FS from "fs";
import { promisify } from "util";

import { DataSourceIdentifier } from "../types";
import { DataSources } from "../main";

const readFile = promisify(FS.readFile);

export async function loadDataSource(
  identifier: DataSourceIdentifier,
  { params }: { params: Record<string, string> }
): Promise<{} | undefined> {
  if (identifier === DataSources.Feed.list) {
    const data = await readFile(Path.join(__dirname, "Feed/list/index.json"), {
      encoding: "utf-8"
    });
    return JSON.parse(data);
  } else if (identifier === DataSources.Viewer.profile) {
    return {
      username: "example_user"
    };
  } else if (identifier.type === "urlParam") {
    return params[identifier.param];
  }
}
