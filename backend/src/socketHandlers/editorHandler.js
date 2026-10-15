import fs from 'fs/promises'
import path from 'path'



export const handleEditorSocketEvents = (socket, editorNamespace) =>{
        
    socket.on("writeFile", async ( {data, pathToFileOrFolder} )=>{
               try{
                const response = await fs.writeFile(pathToFileOrFolder, data);
                editorNamespace.emit("writeFileSuccess", {
                    data : "File written succesfully "
                })
               }catch(error){
                console.log(error);
                socket.emit("error",{
                    data : "Error occured in writing the file "
                })
               }
    })

    socket.on("createFile", async ( {pathToFileOrFolder} )=>{
        const isFileExists = await fs.stat(pathToFileOrFolder);
        if(isFileExists){
            socket.emit("error", {
                data : "File already exists"
            })
            return ;
        }

        try{
        const response = await fs.writeFile(pathToFileOrFolder, "");
        socket.emit("createFileSuccess", {
            data : "File created successfully"
        })
        }catch(error){
            console.log(error);
            socket.emit("error", {
                data : "ERROR IN CREATING THE FILE ."
            })
        }

    });

    socket.on("readFile", async( {pathToFileOrFolder} )=>{
       try{
       const response = await fs.readFile(pathToFileOrFolder, "utf-8");
         socket.emit("readFileSuccess", {
            value : response.toString() ,
            path : pathToFileOrFolder
         })
       }catch(error){
           console.log("Error reading the file ", error);
           socket.emit("error", {
            data : "error in reading the file ."
           })
       }
    });

    socket.on("deleteFile", async ( {pathToFileOrFolder})=>{
        try{
            const response = await fs.unlink(pathToFileOrFolder);
            editorNamespace.emit("deleteFileSuccess", {
                data : "file deleted successfully"
            })
        }catch(error){
            console.log("Error deleting the file ", error) ;
            socket.emit("error", {
                data : "error in deleting file"
            })
        }
    })

    socket.on("createFolder", async({pathToFileOrFolder})=>{
        try{
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess", {
                data : "Folder created ."
            })
        }catch(error){
            console.log("error in creating the folder", error) ;
            socket.emit("error", {
                data : "error in creating the folder. "
            })
        }
    });

    socket.on("deleteFolder", async({pathToFileOrFolder})=>{
        try{
        const response = await fs.rmdir(pathToFileOrFolder, {recursive : true});
        socket.emit("deletedFolderSuccess", {
            data : "Folder deletion successful ."
        })
        }catch(error){
            console.log("error in deleting the folder", error);
         socket.emit("error", {
            data : "error in deleting the folder ."
         })
        }
    })

    socket.on("renameFile", async({fileFolderData, newName})=>{
        try{
            console.log("hello");
            const oldPath = fileFolderData.path.replace(/\\/g, "/");
           const arr = oldPath.split('/');
           arr.pop();

           console.log(arr.join('/'));
const newPath = path.join(arr.join('/'), newName)
console.log(newPath)
           await fs.rename(fileFolderData.path, newPath);

           editorNamespace.emit("renameFileSuccess", {
            data : "file renamed successfully"
           })
        }catch(error){
            console.log("error in renaming ", error);
            socket.emit("error", {
                data : "error in renaming the folder ."
            })
        }
    })

}
