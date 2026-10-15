import React, { useState } from 'react'
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import FileIcon from '../../atoms/FileIcon/FileIcon.jsx'
import { useEditorSocketStore } from '../../../store/editorSocketStore.js';
import { FileContextMenu } from '../ContextMenu/FileContextMenu.jsx';
import { useFileContextMenueStore } from '../../../store/fileContextMenuStore.js';
import { useFolderContextMenueStore } from '../../../store/folderContextMenuStore.js';

export const TreeNode = ({fileFolderData})=> {

  const {editorSocket} = useEditorSocketStore();

const [visibility , setVisibility] = useState({});

const {setX : setFileContextMenuX
   , setY : setFileContextMenuY
    , setIsOpen  : setFileContextMenueIsOpen
     , setFile} = useFileContextMenueStore();

    const {setX : setFolderContextMenuX, 
      setY : setFolderContextMenuY, 
      setIsOpen : setFolderContextMenueIsOpen , 
      setFolder} = useFolderContextMenueStore() ;

function toggleVisibility(name){
  setVisibility({
    ...visibility,
    [name] : !visibility[name]
  })
}

function computeExtension(name){
  let ext = name.split(".") ;
  return ext[ext.length-1];
}

function handleDoubleClick(path){
  console.log("i got double clicked", path)
     editorSocket.emit("readFile", {
      pathToFileOrFolder : path
     })
}

function handleContextMenuForFile(e, fileFolderData){
  e.preventDefault(); 
  console.log("right clicked on , " , fileFolderData)
   setFile(fileFolderData);
   setFileContextMenuX(e.clientX);
   setFileContextMenuY(e.clientY);
   setFileContextMenueIsOpen(true);
}

function handleContextMenuForFolder(e, fileFolderData){
  e.preventDefault();
  console.log("right clicked on ", fileFolderData);
  setFolder(fileFolderData);
  setFolderContextMenuX(e.clientX);
  setFolderContextMenuY(e.clientY);
  setFolderContextMenueIsOpen(true);
}

  return (
    fileFolderData && 
    <div
    
    style={{padding: "15px", marginTop : "5px", 
      color : "white", 
    }} className='p-2'>
      {fileFolderData.children ? (
        
        <button className='flex justify-center align-bottom relative cursor-pointer'
        onClick={()=> toggleVisibility(fileFolderData.name) }
        onContextMenu={(e)=> handleContextMenuForFolder(e, fileFolderData)}
        >
            {visibility[fileFolderData.name] ? (<FaCaretDown className='h-6 w-6  '/>) : (<FaCaretRight className='h-6 w-6  '/>)}
          <span>{fileFolderData.name}</span>


      </button>) : (

        <div style={{color : "white"}} className='cursor-pointer ml-1 flex '>
          <span className='flex cursor-pointer '
          onContextMenu={(e)=> handleContextMenuForFile(e, fileFolderData)}
           onDoubleClick={()=> handleDoubleClick(fileFolderData.path)} >
            <div className='mr-1 flex justify-center align-center'>
              <FileIcon extenstion={computeExtension(fileFolderData.name)} />
            </div>
          {fileFolderData.name}
          </span>
          
        </div>

      )}
{visibility[fileFolderData.name] && fileFolderData.children && (
  fileFolderData.children.map((child)=>(
    <TreeNode
    key={child.name}
     fileFolderData={child}/>
  ))
)}
      </div>
  )
}

