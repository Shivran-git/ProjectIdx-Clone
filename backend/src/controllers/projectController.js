import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises' ;
import {v4 as uuidv4} from 'uuid' ;

const exec = util.promisify(child_process.exec);
export const createProjectController = async(req, res)=>{
        
   // Create a new id and then inside it the projects folder create a new folder with that id 
const projectId = uuidv4();
console.log("New project id is : ", projectId) ;

await fs.mkdir(`./projects/${projectId}`);

// after this is done, call npm create vite command in just new created project folder . 

const response = await exec('npm create vite@latest sandbox -- --template react', {
    cwd : `./projects/${projectId}`
})
    return res.json({message : 'Project created ', projectId})
};