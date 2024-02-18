
import multer from "multer";
//1. Import the multer

//2.Configure the storage with filename and location

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./uploads/') ; //The path where we want to store our files in


//     },
//     filename:(req,file,cb)=>{
//         cb(null,new Date().toISOString()+file.filename);
//     }


// });

//It is different from the others
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads/');

    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '_') +    file.originalname //In the updated code, the String.prototype.replace() method is used to replace
                                                                               //all colons in the timestamp with underscores.
                                                                            //   By addressing the issue of colons in filenames using the updated code, we
                                                                            //ensure cross-platform compatibility for file uploads
            
        );
    },
    
});


export const  upload=multer({storage:storage});