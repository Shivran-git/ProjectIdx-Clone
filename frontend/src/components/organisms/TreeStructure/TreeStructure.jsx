import { useParams } from "react-router";
import { useTreeStore } from "../../../store/treeStructureStore.js"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";
import { useFileContextMenueStore } from "../../../store/fileContextMenuStore.js";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu.jsx";
import { useFolderContextMenueStore } from "../../../store/folderContextMenuStore.js";
import { FolderContextMenu } from "../../molecules/ContextMenu/FolderContextMenu.jsx";
import { RenameBox } from "../../molecules/RenameBox/RenameBox.jsx";

export const TreeStructure = ()=>{

    const { treeStructure, setTreeStructure} = useTreeStore();
    const {x : fileContextX, y : fileContextY , isOpen : isFileContextOpen, file, renameBoxForFile} = useFileContextMenueStore() ;

    const {x : folderContextX, y : folderContextY, isOpen : isFolderContextOpen, folder} = useFolderContextMenueStore();
   
  
    useEffect(()=>{
        if(treeStructure){
            console.log(treeStructure)
        }else{
            setTreeStructure();
        }
    }, [ setTreeStructure, treeStructure], );

    return(
        <>
        {isFileContextOpen && fileContextX && fileContextY && file && 
        <FileContextMenu
         x = {fileContextX}
         y = {fileContextY}
         fileFolderData= {file}
 
        />}
        {isFolderContextOpen && folderContextX && folderContextY && folder && 
        <FolderContextMenu
        x = {folderContextX}
        y = {folderContextY}
        fileFolderData = {folder} />
        }

        {renameBoxForFile && fileContextX && fileContextY && file && 
        <RenameBox 
       
        fileFolderData = {file}
        />
        }

         <TreeNode
            fileFolderData={treeStructure}
            />
        </>
 
    )
}
