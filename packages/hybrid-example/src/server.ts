import { Server } from "hapi";
import jsonStringifyForHTML from "htmlescape";

import {
  GazetteerRoute,
  DataSourceResult,
  DataSourceIdentifier,
  dataSourceIdentifierToString
} from "./types";
import { State } from "./state";
import { loadDataSource } from "./dataSources/server";
import { htmlPage, renderTemplateHTML } from "./templates/server";
import {
  loadChunkForPublicPath,
  assetPublicPathForTemplate,
  assetPublicPathForActivateTemplate
} from "./assets/server";

import "./templates/Feed/Feed";
import "./templates/FeedVue/FeedVue";
import "./templates/EditAccount/EditAccount";
import "./templates/UserProfile/UserProfile";

export async function startServer({
  routes,
  state
}: {
  routes: Array<GazetteerRoute>;
  state: State;
}) {
  const server = new Server({
    port: process.env.PORT
  });

  server.route([
    {
      method: "GET",
      path: "/-debug",
      handler(request, h) {
        return routes;
      }
    }
  ]);

  server.route([
    {
      method: "GET",
      path: "/public/chunks/{assetPath*}",
      async handler(request, h) {
        const assetPath = request.params.assetPath;
        return h
          .response(await loadChunkForPublicPath(assetPath))
          .type("text/javascript");
      }
    }
  ]);

  routes.forEach(route => {
    route.paths.forEach(path => {
      server.route({
        method: "GET",
        path,
        async handler(request, h) {
          try {
            const results = (await Promise.all(
              route.dataSources.map(identifier =>
                loadDataSource(identifier, { params: request.params })
                  .then(data => ({
                    identifier,
                    identifierEncoded: dataSourceIdentifierToString(identifier),
                    data,
                    loaded: true
                  }))
                  .catch(error => ({
                    identifier,
                    identifierEncoded: dataSourceIdentifierToString(identifier),
                    error: error as Error,
                    loaded: true
                  }))
              )
            )) as Array<DataSourceResult & { identifier: DataSourceIdentifier }>;

            const contentHTML =
              (await renderTemplateHTML({
                id: route.template,
                resultForDataSource<Data>(identifier: DataSourceIdentifier) {
                  return (results.find(
                    result => result.identifier === identifier
                  ) || {
                    loaded: false
                  }) as DataSourceResult<Data>;
                }
              })) || "";

            const templateName = route.template.name;
            const templatePublicPath = await assetPublicPathForTemplate(
              templateName
            );

            const activateChunkNames = await state.getChunkNamesFor("activateTemplate");
            const templateChunkNames = await state.getChunkNamesFor(templateName);
            const chunkNames = [...(activateChunkNames || []), ...(templateChunkNames || [])]
            console.log(templateName, "chunkNames", chunkNames);

            const activateTemplatePublicPath = await assetPublicPathForActivateTemplate();
            const bodyHTML = `
  <div id="root">${contentHTML}</div>

  ${
    chunkNames
      ? chunkNames
          .map(chunkName => `<script src="/public/chunks/${chunkName}"></script>`)
          .join("\n")
      : ""
  }
  <script src="/public/chunks/${templatePublicPath}"></script>
  <script src="/public/chunks/${activateTemplatePublicPath}"></script>

  <script>
  window.activateTemplate(${jsonStringifyForHTML(templateName)});
  </script>
            `;

            return h
              .response(
                htmlPage(
                  `<script type="json" id="dataSourcesInitial">${jsonStringifyForHTML(
                    results
                  )}</script>`,
                  bodyHTML
                )
              )
              .type("text/html");
          }
          catch (error) {
            console.error(error);
            throw error;
          }
        }
      });
    });
  });

  server.events.on("log", (event, tags) => {
    if (tags.error) {
      console.log(
        `Server error: ${
          event.error ? (event.error as any).message : "unknown"
        }`
      );
    } else {
      console.log(event)
    }
  });

  await server.start();
}
