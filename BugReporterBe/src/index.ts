import type { Express, Request, Response } from "express";
const express = require("express");

const port = 3001; 
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
}); 