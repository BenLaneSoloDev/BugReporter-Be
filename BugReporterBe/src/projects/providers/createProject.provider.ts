import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Project = require("../projects.schema.ts");

async function createProjectProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    // ! Replace User ID with authenticated user
    const project = new Project({
      user: "00000020f51bb4362eee2a4d",
      title: req.body.title,
      description: req.body.description,
      developmentAreas: req.body.developmentAreas,
      environments: req.body.environments
    });

    await project.save();

    return res.status(StatusCodes.OK).json({ item: "The project created" });
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = createProjectProvider;