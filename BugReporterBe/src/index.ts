import type { Express, Request, Response } from "express";
const configureApp = require("./settings/config.ts");
const express = require("express");

const port = 3001; 
const app: Express = express();

// Handles Adding Middleware and Routes
configureApp(app);

app.listen(port, () => {
    console.log("App listening on port: " + port);
}); 