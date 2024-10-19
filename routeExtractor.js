import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

function cleanRoutePath(routePath) {
  return routePath
    .replace(/\\\//g, "/")
    .replace(/\(\?:\\\/\)\?/g, "")
    .replace(/\(\?\=\/\|\$\)/g, "")
    .replace(/\^|\$|\?/g, "")
    .replace(/\/{2,}/g, "/");
}

function getRoutes(stack, parentPath = "") {
  let routes = [];

  stack.forEach((layer) => {
    if (layer.route) {
      let routePath = parentPath + layer.route.path;
      const methods = Object.keys(layer.route.methods).map((m) =>
        m.toUpperCase()
      );
      routePath = routePath.replace(/\/{2,}/g, "/");
      routes.push({ path: cleanRoutePath(routePath), methods });
    } else if (layer.name === "router") {
      const routerPath = parentPath + cleanRoutePath(layer.regexp.source);
      routes = routes.concat(getRoutes(layer.handle.stack, routerPath));
    }
  });

  return routes;
}

function generatePostmanCollection(routes, collectionName) {
  const collection = {
    info: {
      name: collectionName || "API Collection",
      description: "Postman collection generated from Express routes.",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: routes.map((route) => ({
      name: `${route.methods.join(", ")} ${route.path}`,
      request: {
        method: route.methods[0],
        header: [],
        body: { mode: "raw", raw: "" },
        url: {
          protocol: "http",
          host: "{{base_url}}",
          path: route.path.split("/").filter(Boolean),
        },
      },
    })),
  };

  return collection;
}

export function extractRoutesFromServer({ serverFilePath, collectionName }) {
  const fileUrl = pathToFileURL(path.resolve(serverFilePath)).href;

  import(fileUrl)
    .then((server) => {
      const app = server.default;
      if (app && app._router) {
        const allRoutes = getRoutes(app._router.stack);
        allRoutes.forEach((route) =>
          console.log(`${route.methods.join(", ")} ${route.path}`)
        );

        const collection = generatePostmanCollection(allRoutes, collectionName);
        const collectionPath = path.join(
          process.cwd(),
          `${collectionName || "postman-collection"}.json`
        );
        fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
        console.log(`Postman collection generated: ${collectionPath}`);
      } else {
        console.error("No Express app found.");
      }
    })
    .catch((err) => console.error("Error loading server file:", err));
}