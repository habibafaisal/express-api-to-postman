#!/usr/bin/env node

import { extractRoutesFromServer } from "../routeExtractor";

const args = process.argv.slice(2);

const serverFile = args[0];
const collectionName = args[1] || "My Automated API Collection";
if (!serverFile) {
  console.error("Error: Please provide the path to your Express server file.");
  process.exit(1);
}
extractRoutesFromServer({
  serverFilePath: serverFile,
  collectionName,
});
