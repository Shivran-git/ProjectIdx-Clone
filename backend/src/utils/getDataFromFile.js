import fs from 'fs/promises';


export const getDataFromFile = async(req, res)=>{
    try{
        const {normalPath} = req.body ;
        console.log(normalPath);
       const data = await fs.readFile(normalPath, "utf-8");
       return res.status(200).json({
         textValue : data
       }) ;
    }catch(error){
        throw error ;
    }
}