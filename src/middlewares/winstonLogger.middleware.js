import fs from 'fs';
import winston from 'winston';
const fsPromise=fs.promises;

const logger=winston.createLogger({
    level:'info',                 // the type of info the data will be stored

    format:winston.format.json(), //the format in which the data will be stores

    defaultMeta:{service:'request-logging'},//what kind of logging we are doing

    transports:[                  //the filename where we want to store the data
     new winston.transports.File({filename:'logs.txt'})
    ]
})


export const winstonLoggerMiddleware = async (req, res, next) => {
    // Write your code here
    if (req.url === '/api/user') {
      const logData = `${req.url} - ${JSON.stringify(req.body)}`; // Converting it into a string
    logger.info(logData);
    }
    next();
  };
  
  export default winstonLoggerMiddleware;