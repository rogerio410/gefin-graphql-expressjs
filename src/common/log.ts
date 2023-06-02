import * as expressWinston from 'express-winston';
import * as winston from 'winston';

// Config expressWinston logging to all https requests
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    )
}

if (!process.env.DEBUG){
    // if not debug, log request in as one-liners
    loggerOptions.meta = false; 
}

const my_logger = expressWinston.logger(loggerOptions)
export { my_logger };
