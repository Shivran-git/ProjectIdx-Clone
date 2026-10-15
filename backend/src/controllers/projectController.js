import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises' ;
import {v4 as uuidv4} from 'uuid' ;
import { createProjectService } from '../service/projectService.js';
import { getProjectTreeService } from '../service/projectService.js';

export const createProjectController = async(req, res)=>{
   const projectId =  await  createProjectService();
   // Create a new id and then inside it the projects folder create a new folder with that id 
    
// once the folder is created we have to think about how can we upload this folder to our aws s3 .
    return res.json({message : 'Project created ', projectId})
};

export const getProjectTree = async(req, res)=>{
    try{
        const tree = await getProjectTreeService(req.params.projectId);
       
    return res.status(200).json({
        data : tree,
        success : true ,
        message : "Successfully fetched the tree"
    })
    }catch(error){
       console.log(error);
       throw error ;
    }
    
}
