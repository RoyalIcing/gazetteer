import { Server } from "hapi";
import jsonStringifyForHTML from "htmlescape";

import { GazetteerRoute, DataSourceResult, dataSourceIdentifierToString, DataSourceIdentifier } from "./types";
import { routes } from "./main";
import { loadDataSource } from "./dataSources/server";
import { htmlPage, renderTemplateHTML } from "./templates/server";

async function start(routes: Array<GazetteerRoute>) {
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
                return (results.find(result => result.identifier === identifier) || {
                  loaded: false
                }) as DataSourceResult<Data>;
              }
            }) || "";

          return h
            .response(
              htmlPage(
                `<script id="dataSourcesInitialResults" type="json">${jsonStringifyForHTML(
                  results
                )}</script>`,
                contentHTML
              )
            )
            .type("text/html");

          // return {
          //   templateType: route.templateType,
          //   dataSources: route.dataSources.map(symbol => symbol.toString()),
          //   results
          // };
        }
      });
    });
  });

  await server.start();
}

start(routes);
