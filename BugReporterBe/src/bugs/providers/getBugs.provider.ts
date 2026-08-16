import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";

async function getBugsProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    const total = await Bug.countDocuments();
    const limit: number = typeof(req.query.limit) === "string" ? parseInt(req.query.limit, 10) : 5; 
    const page: number = typeof(req.query.page) === "string" ? parseInt(req.query.page, 10) : 1;
    const baseURL = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const projectId = req.params.projectId;
    const filter = projectId ? { project: projectId } : {};

    const Bugs = await Bug.find(filter).limit(limit).skip(page-1).sort({ title: 1 }); // Arranges alphabetically by default

    let finalResponse = {
      data: Bugs,
      pagination: {
        meta: {
          bugsPerPage: limit,
          totalBugs: total,
          currentPage: page,
          totalPages: Math.ceil(total/limit),
        },
        links: {
          first: `${baseURL}?limit=${limit}&page=${1}`,
          last: `${baseURL}?limit=${limit}&page=${Math.ceil(total/limit)}`,
          current: `${baseURL}?limit=${limit}&page=${page}`,
          next: page === Math.ceil(total/limit) ? `` : `${baseURL}?limit=${limit}&page=${page + 1}`,
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