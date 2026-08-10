import type { Express, Request, Response } from "express";
const express = require("express");

const port = 3001; 
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Get Successful");
});

app.post("/", (req: Request, res: Response) => {
  res.send("Post Successful")
})

app.patch("/", (req: Request, res: Response) => {
  res.send("Patch Successful")
})

app.delete("/", (req: Request, res: Response) => {
  res.send("Delete Successful")
})

app.listen(port, () => {
    console.log("App listening on port: " + port);
}); 