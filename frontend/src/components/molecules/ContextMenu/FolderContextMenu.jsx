import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFolderContextMenueStore } from "../../../store/folderContextMenuStore";

import './fileContextMenu.css'



export const FolderContextMenu = ({fileFolderData, x, y})=>{

const {setIsOpen} = useFolderContextMenueStore();
const {editorSocket} = useEditorSocketStore();

    function handleFolderDelete(e){
       e.preventDefault();
       
       console.log("Deleting folder at ", fileFolderData.path) ;
       editorSocket.emit("deleteFolder", {
        pathToFileOrFolder : fileFolderData.path
       })
    }

  


            return (
                <>
                  <div 
                  onMouseLeave={()=>{
                    console.log("mouse left")
                    setIsOpen(false);
                  }}
                  style={{
                    width : "120px",
                    position : "fixed",
                    left : x, 
                    top : y,
                    color : "white",
                    border : " 1.5px solid black",
                    borderRadius : "1px"
                    
                  }}

                  className="flex flex-col items-center bg-gray-700"
                  >
                    <button
                    className="fileContextButton"
                    >
                       Cut
                       </button>
                       <button
                       className="fileContextButton"
                       >
                        Copy
                       </button>
                       <button
                       className="fileContextButton"
                       >
                        Paste
                       </button>
                    <button onClick={handleFolderDelete}
                    className="fileContextButton"
                    >
                        Delete
                    </button>
                    <button
                    className="fileContextButton"
                    
                    >
                        Rename
                    </button>

                </div>
                </>
              
            )
}