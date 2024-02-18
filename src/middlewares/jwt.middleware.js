
// import jwt from 'jsonwebtoken';

// // Here we want to access the routes only if the token is valid
// // We will use middleware to check if the token is present and validate it. 

// const jwtAuth = (req, res, next) => {
//     // 1. Read the token
//     // We are expecting the client to send the token inside the headers['authorization]

//     // console.log(req.headers);
//     const token = req.headers["authorization"];
// //    console.log(token);
//     // 2. If no token then return the error
//     if (!token) {
//         return res.status(401).send("Unauthorized ");
//     }

//     // 3. If the token is valid then call the next middleware else return the error
//     try {
//         const payload = jwt.verify(token,'myName' ); // This is going to return the payload
//         // 'eQk1vC4t1A33cfHhsr6bkmZ6rT1Vy6lj'
//         //Add the token to the authorization in the postman
//         console.log(payload);
//     } catch (err) {
//         //4.Return the error
//         console.log(err);
//         return res.status(401).send("Unauthorized ");
//     }
//     //5.Call the next middleware

//     next();

// }

// export default jwtAuth;
import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // 1. Read the token
    // We are expecting the client to send the token inside the headers['authorization]
    const  token = req.headers["authorization"];
   
    //  console.log(token);
    // 2. If no token then return an error
    if (!token) {
        return res.status(401).send("Unauthorized: Token missing");
    }
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
  
    //We have made the changes
    // 3. If the token is valid then call the next middleware else return an error
    try {
        const payload = jwt.verify(tokenWithoutBearer,  'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz');
        // console.log(payload);
        // Attach the payload to the request for further use if needed
        req.userID = payload.userID;
        // console.log(payload.userId,"HEY THERE");
        console.log(payload.userID);
        // console.log(payload);
        // next(); // Call the next middleware
    } catch (err) {
        // 4. Return an error for invalid tokens
        // console.error(err.message);
        return res.status(401).send("Unauthorized: Invalid token");
    }
    next();
};

export default jwtAuth;
