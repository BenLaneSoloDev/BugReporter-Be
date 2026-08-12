import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function getBugsProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {
    // ? Extract query params into variables

    // ? Grab project ID from req as additional filter

    // ? Get Bugs From DB (using query param filters)

    let finalResponse = {
      data: [{
        title: "",
        category: "",
        severity: "",
        stepsToReproduce: ["", "", ""],
        environment: ["", "", ""],
        expectedResult: "",
        actualResult: "",        
      }],
      pagination: {
        meta: {
          bugsPerPage: "",
          totalBugs: "",
          currentPage: "",
          totalPages: "",
        },
        links: {
          first: "",
          last: "",
          current: "",
          next: "",
          previous: ""
        }
      }
    }

    return res.status(StatusCodes.OK).json(finalResponse);
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = getBugsProvider;