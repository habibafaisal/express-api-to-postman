# express-api-to-postman

express-api-to-postman is a Node.js package that automates the generation of a Postman collection from your Express API routes. It helps developers quickly document and test their APIs by extracting route information from an Express app and converting it into a Postman collection file.

## 📦 TypeScript Support

As of version `v1.1.0`, `express-api-to-postman` comes with built-in TypeScript support.

## Features

- Automatically extracts all routes from an Express app
- Supports multiple HTTP methods (GET, POST, PUT, DELETE, etc.).
- Cleans and structures routes into a Postman-compatible collection
- Easy to use allowing users to specify the server file and the desired collection name.
- Generates a Postman collection in JSON format.

## Installation

Install express-api-to-postman with npm

```bash
npm i express-api-to-postman
```

## Usage

After installing the package, you can run it using the following command:

```bash
express-api-to-postman <serverFilePath> <collectionName>
```

Once the command is executed, a Postman collection file will be created, which can be imported into Postman for testing.

## Things to Keep in Mind

### 1. Server File Requirements

- The Express app should export the Express instance, typically assigned to app. This allows express-api-to-postman to access the app and extract the route definitions.
- Ensure that the file path provided to express-api-to-postman is correct and points to the file where your Express app is instantiated.

### 2. Handling of Nested Routes

- If your Express app contains nested routes (e.g., via express.Router()), these routes will also be detected and added to the Postman collection. The tool handles this by recursively traversing the app's router stack and normalizing route paths.

### 3. Custom Methods and Middleware

- Routes that use custom middleware or HTTP methods (like PATCH or OPTIONS) will be included as long as they are explicitly defined in your Express app.
- The collection generator currently selects the first defined HTTP method when multiple methods are found for the same route. You may want to review and adjust the collection if you have routes that respond to multiple methods.

### 4. Postman Collection URL

- The generated collection uses a placeholder {{base_url}} for the API’s base URL, which you can replace with your actual base URL in Postman.
- The collection file does not automatically infer the API’s host or port number, so remember to set the base_url environment variable in Postman before making requests.

### 5. Error Handling

- If the tool is unable to load your server file or finds no routes in the Express app, an error will be logged. Ensure that your Express app is correctly exporting the app object.
- If no routes are found, double-check the provided file path, and confirm that routes are defined before running the command.

### 6. Generated Postman Collection

- The generated Postman collection will have an individual item for each route in your Express app. Each item will be structured with the following:
  - The route’s method (GET, POST, etc.).
  - A placeholder for request bodies (for methods like POST and PUT).
  - A default {{base_url}} variable in the URL field.

You may modify these defaults as needed once the collection is imported into Postman.

## Sample Code

Here's a sample Express app (server.js) to demonstrate usage with express-api-to-postman:

```js
// server.js
import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({ message: "List of users" });
});

app.post("/users", (req, res) => {
  res.json({ message: "User created" });
});

app.put("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} updated` });
});

app.delete("/users/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

export default app;
```

To generate a Postman collection from this app:

```bash
express-api-to-postman ./server.js MyApiCollection
```

## Collaborations are Welcome!

This package is open to collaboration, and I am eager to work with other developers to enhance and expand its capabilities. Whether you want to suggest improvements, report issues, or contribute code, your involvement is highly appreciated.

Here are some ways to contribute:

- Submit a pull request to add new features or fix bugs.
- Open an issue to report bugs, suggest new features, or share feedback.
- Share this package with others who might find it useful.
- Join the discussion by providing input on open issues or ideas for future updates.

If you’re interested in collaborating or have any questions or feedback, feel free to reach out to me via [LinkedIn](https://www.linkedin.com/in/habiba-faisal-a46b75176/) or email me at habibafaisal8@gmail.com.

## Linkedin

- [Habiba Faisal](https://www.linkedin.com/in/habiba-faisal-a46b75176/)

## Authors

- [@habibafaisal](https://www.github.com/habibafaisal)
