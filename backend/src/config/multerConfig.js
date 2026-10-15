import { s3 } from "./awsConfig.js";
import multer from 'multer' ;
import multerS3 from 'multer-s3' ;

export const s3Uploader= multer({
    storage: multerS3({
        s3 : s3,
        bucket:process.env.AWS_BUCKET_NAME,
        key:function(req, file, cb){
            if(!file){
                return cb(new Error('No file found'));
            }
            console.log(file);
                          
              cb(null, file.originalname);
          
        }
    })
})