import expressWinston from "express-winston";
import logger from "../helpers/winston.helper.ts";

const expressWinstonLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: `HTTP {{req.method}} {{req.url}} responded with {{res.statusCode}} in {{res.responseTime}}ms`,
  expressFormat: true,
  colorize: true
})

export default expressWinstonLogger;