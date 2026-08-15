import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Project = require("../projects.schema.ts");
const errorLogger = require("../../helpers/errorLogger.helper.ts");

async function getProjectsProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    const total = await Project.countDocuments();
    const limit: number = typeof(req.query.limit) === "string" ? parseInt(req.query.limit, 10) : 5; 
    const page: number = typeof(req.query.page) === "string" ? parseInt(req.query.page, 10) : 1;
    const baseURL = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const projects = await Project.find().limit(limit).skip(page-1).sort({ title: 1 }); // Grabs all projects in alphabetical order

    const returnData = {
      data: projects,
      pagination: {
        pagination: {
          meta: {
            projectsPerPage: limit,
            totalProjects: total,
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
    }

    return res.status(StatusCodes.OK).json(returnData);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error getting projects: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = getProjectsProvider;