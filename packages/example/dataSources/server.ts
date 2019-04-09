import * as Path from "path";
import * as FS from "fs";
import { promisify } from "util";

import { DataSources } from "../main";

const readFile = promisify(FS.readFile);

export async function loadDataSource(id: symbol): Promise<{} | undefined> {
  if (id.toString() === DataSources.Feed.list.toString()) {
    const data = await readFile(Path.join(__dirname, "Feed/list/index.json"), {
      encoding: "utf-8"
    });
    return JSON.parse(data);
  } else if (id.toString() === DataSources.Viewer.profile.toString()) {
    return {
      username: "example_user"
    };
  }
}
