import Docker from 'dockerode' ;
import { dirname } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';
    

const docker = new Docker() ;

export const handleContainerCreate = async (projectId, socket)=>{

   console.log("Project id for container creation >>" , projectId)
    try{
         const container = await docker.createContainer({
        Image : "sandbox",
        AttachStdin : true ,
        AttachStdout : true,
        AttachStderr : true ,
        CMD : ['/bin/bash'],
        Tty : true ,
        User : "sandbox",
        HostConfig : {
         Binds : [ // here we are mounting the project directory from the host machine to the container .
            `${import.meta.dirname}/../../projects/${projectId}:/home/sandbox/app`
         ],
         PortBindings : {
            "5173/tcp" : [
               {
                  "HostPort" : "0"       // a random port of the host machine will be assigned to the docker 
               }
            ]
         },
         ExposedPorts : {
            "5173/tcp" : {}         // ports to which connection is allowed .
         },
         Env : ["HOST=0.0.0.0"]
        }
     })

     console.log("Container created ", container.id ) ;

     await container.start() ;
console.log("container started successfully .") ;
       
container.exec({
   Cmd : ["/bin/bash"],
   User : "sandbox" ,
   AttachStdin : true ,
   AttachStderr : true ,
   AttachStdout : true ,

}, (err, exec)=>{
   if(err){
      console.log("error in exec ," , err) ;
      return ;
   }
     
   exec.start({hijack : true , stdin : true}, (err, stream)=>{

      if(err){
         console.log("error in exec.start ", err);
         return ;
      }
         processStream(stream, socket) ;
         socket.on("shell-input", (data)=>{
            console.log(data);
            console.log("-------------->>>>>> ", stream);
            stream.write("ls\n");

         })
   })


})

    }catch(error){
            console.log("Error in creating the container ", error) ;
    }
}

 function processStream(stream, socket){
   let buffer = Buffer.from("");


   stream.on("data", (data)=>{
      buffer =   Buffer.concat([buffer, data]);
      socket.emit("shell-output", buffer.toString());
      console.log("<><><><>")
      buffer = Buffer.from("");
   })

   stream.on("end", ()=>{
      console.log("stream is ended");
      socket.emit("shell-output", "Stream ended");
   })

   stream.on("error", (err)=>{
      console.log("stream error", err)
      socket.emit("shell-output", "error in the stream ")
   })
}