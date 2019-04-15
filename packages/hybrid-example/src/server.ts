import { Server } from "hapi";
import jsonStringifyForHTML from "htmlescape";

import {
  GazetteerRoute,
  DataSourceResult,
  DataSourceIdentifier
} from "./types";
import { loadDataSource } from "./dataSources/server";
import { htmlPage, renderTemplateHTML } from "./templates/server";
import { loadAssetForPublicPath, loadChunkForPublicPath, assetPublicPathForTemplate, assetPublicPathForActivateTemplate } from "./assets/server";
import "./templates/Feed/Feed";
import "./templates/EditAccount/EditAccount";
import "./templates/UserProfile/UserProfile";

export async function startServer(routes: Array<GazetteerRoute>) {
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
          const results = (await Promise.all(
            route.dataSources.map(identifier =>
              loadDataSource(identifier, { params: request.params })
                .then(data => ({ identifier, data, loaded: true }))
                .catch(error => ({
                  identifier,
                  error: error as Error,
                  loaded: true
                }))
            )
          )) as Array<DataSourceResult & { identifier: DataSourceIdentifier }>;

          const contentHTML =
            renderTemplateHTML({
              id: route.template,
              resultForDataSource<Data>(identifier: DataSourceIdentifier) {
                return (results.find(
                  result => result.identifier === identifier
                ) || {
                  loaded: false
                }) as DataSourceResult<Data>;
              }
            }) || "";

          const templateName = route.template.name;
          const templatePublicPath = await assetPublicPathForTemplate(templateName);
          const activateTemplatePublicPath = await assetPublicPathForActivateTemplate();
          const bodyHTML = `
            <div id="root">${contentHTML}</div>

            <script src="/public/chunks/chunk-bfa94d84.js"></script>
            <script src="/public/chunks/chunk-b73c8f46.js"></script>
            <script src="/public/chunks/${templatePublicPath}"></script>
            <script src="/public/chunks/${activateTemplatePublicPath}"></script>

            <script>
            window.activateTemplate(${JSON.stringify(templateName)});
            </script>
          `;

          return h
            .response(
              htmlPage(
                `<script id="dataSourcesInitialResults" type="json">${jsonStringifyForHTML(
                  results
                )}</script>`,
                bodyHTML
              )
            )
            .type("text/html");
        }
      });
    });
  });

  await server.start();
}
