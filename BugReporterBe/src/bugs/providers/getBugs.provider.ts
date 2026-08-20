import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import Project from "../../projects/projects.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";
import { matchedData } from "express-validator";

async function getBugsProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);

  try {
    const projectId = validatedResult.projectId;
    const project = await Project.findOne({ _id: projectId, user: req.user?.sub }); // Only add bug to this project if its own user submits this request
    if (!project) return res.status(StatusCodes.NOT_FOUND).json({ reason: "No Project found for the provided ID" });
    
    const total = await Bug.countDocuments({ project: projectId });
    const limit: number = typeof(validatedResult.limit) === "string" ? parseInt(validatedResult.limit, 10) : 5; 
    const page: number = typeof(validatedResult.page) === "string" ? parseInt(validatedResult.page, 10) : 1;
    const totalPages = total === 0 ? 1 : Math.ceil(total/limit);

    const baseURL = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const Bugs = await Bug.find({ project: projectId }).limit(limit).skip((page-1) * limit).sort({ title: 1 }); // Arranges alphabetically by default

    let finalResponse = {
      data: Bugs,
      pagination: {
        meta: {
          bugsPerPage: limit,
          totalBugs: total,
          currentPage: page,
          totalPages: totalPages,
        },
        links: {
          first: `${baseURL}?limit=${limit}&page=${1}`,
          last: `${baseURL}?limit=${limit}&page=${totalPages}`,
          current: `${baseURL}?limit=${limit}&page=${page}`,
          next: page === totalPages ? `` : `${baseURL}?limit=${limit}&page=${page + 1}`,
          previous: page === 1 ? `` :  `${baseURL}?limit=${limit}&page=${page - 1}`
        }
      }
    }

    return res.status(StatusCodes.OK).json(finalResponse);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error getting bugs: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default getBugsProvider;