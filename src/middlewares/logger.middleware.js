import fs from 'fs';

//We will be using the promise based syntax

const fsPromise=fs.promises; //This helps us to write data into files asynchronously without using the callbacks

async function log(logData){
try{
    //We can add the timestamp to know when the data was appended
    logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile(
            'log.txt', 
            logData
            );

}
catch(error){
    console.log(error);

}

}
const loggerMiddleware=async (req,res,next)=>{
    //1.Log request body
    if(!req.url.includes("signin")){  //We dont want to log the signin request where the user is sendig its password
       
   
    const logData = `${req.url
    } - ${JSON.stringify(req.body)}`; //Converting it into string

    await log(logData);
    next();


}
}

//We have wrapped the above function into the middleware 
export default loggerMiddleware;