import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenueStore } from "../../../store/fileContextMenuStore";
import './fileContextMenu.css'



export const FileContextMenu = ({fileFolderData, x, y})=>{

const {setIsOpen, setRenameBoxForFile } = useFileContextMenueStore();
const {editorSocket} = useEditorSocketStore();
 

    function handleFileDelete(e){
       e.preventDefault();
       
       console.log("Deleting file at ", fileFolderData.path) ;
       editorSocket.emit("deleteFile", {
        pathToFileOrFolder : fileFolderData.path
       })
    }

function handleRenameFile(e){
  e.preventDefault();
  console.log("trying to open the box for renaming");
  setRenameBoxForFile(true) ;
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
                    left : x , 
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
                    <button onClick={handleFileDelete}
                    className="fileContextButton"
                    >
                        Delete
                    </button>
                    <button
                    className="fileContextButton"
                    onClick={handleRenameFile}
                    >
                        Rename
                    </button>

                </div>
                </>
              
            )
}