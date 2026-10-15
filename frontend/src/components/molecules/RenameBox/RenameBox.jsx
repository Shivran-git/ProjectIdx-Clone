import { useFileContextMenueStore } from "../../../store/fileContextMenuStore"
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useState } from "react";




export const RenameBox = ({fileFolderData})=>{

const { setRenameBoxForFile } = useFileContextMenueStore();
const {editorSocket} = useEditorSocketStore();
const [text , setText] = useState("");



function handleRename(){
if(text == null) {
  setRenameBoxForFile(false);
  return ;
}
try{

  editorSocket.emit("renameFile", {
    fileFolderData , 
    newName : text
  })
  
}catch(error){
  console.log(error) ;
}finally{
  setRenameBoxForFile(false);
}

}

    return(
        <>
        <div className=" flex bg-gray-600 justify-between gap-4 items-center text-green-500 border-2 border-white">
                <input
                className="bg-white-400 text-white  "
                onChange={(e)=>setText(e.target.value)}
                >
                
                </input>

          <div className="flex justify- start items-center gap-2 w-full">
<button className="font-bold cursor-pointer" onClick={()=> setRenameBoxForFile(false)}>
  Cancel
</button>

<button className="font-bold cursor-pointer" onClick={handleRename}>
  Rename
</button>
          </div>


        </div>
        </>
    )
}