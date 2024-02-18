// Using this we wil be authenticating the user with every req 
//BASIC AUTHENTICATION
// Performing encoding and decoding and not encryption anad decryption
import UserModel from "../features/user/user.model.js";


const basicAuthorizer=(req,res,next)=>{

    //1.Check if the authorization header is empty
    //When we send our credentials those headers will be part of the header(they are actually http headers)

    const authHeader=req.headers["authorization"]; //authorization is a name of key within the headers array
    if(!authHeader){ 
        return res.status(401).send("No authorization details found");
        }
        // console.log(authHeader);

 //2.Extract the credentials(They are present in the form of base 64)[Basic querty390djsiodnjkduskja]=>authHeader exixst in this form
 const base64Credentials=authHeader.replace('Basic','');
//  console.log(base64Credentials);

 //3.Decode the credentials
 const decodedCreds=Buffer.from(base64Credentials,'base64').toString('utf-8');
// console.log(decodedCreds); //[username:password]

const creds=decodedCreds.split(':');  //creds is an array

const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
if(user)
{
    console.log("called");
    next();
}
else{
    return res.status(401).send("User is Unauthorized");
}

}
export default basicAuthorizer;