import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises' ;
import {v4 as uuidv4} from 'uuid' ;
import { exec } from '../utils/execUtility.js';
import dirTree from 'directory-tree';
import path from 'path'


export const createProjectService = async ()=>{
           const projectId = uuidv4();
      console.log("New project id is : ", projectId) ;

         await fs.mkdir(`./projects/${projectId}`);

// after this is done, call npm create  vite command in just new created project folder . 

const response = await exec('npm create vite@latest sandbox -- --template react', {
    cwd : `./projects/${projectId}`
});
return projectId ;

}

export const getProjectTreeService = async(projectId)=>{

    const projectPath =await path.resolve(`./projects/${projectId}`);
    const tree = await dirTree(projectPath);
    console.log("tree =>" , tree);
    return tree ;
}

