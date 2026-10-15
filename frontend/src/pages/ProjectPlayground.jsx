import { useParams } from "react-router"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { useActiveFileTabStore } from "../store/activeFileTabStore.js";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useTreeStore } from "../store/treeStructureStore.js";
import { useEffect } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import {io} from 'socket.io-client'
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal.jsx";


export const ProjectPlayground = ()=>{

    const {projectId : projectIdFromUrl} = useParams();
     const {setProjectId, projectId} = useTreeStore();

     const { setEditorSocket }= useEditorSocketStore();
   

    useEffect(()=>{
        if(projectIdFromUrl){

             setProjectId(projectIdFromUrl);
        
        const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`,{
            query : {
                projectId : projectIdFromUrl
            }
        });

        setEditorSocket(editorSocketConn);
        
        }
       
    }, [setProjectId, projectIdFromUrl, setEditorSocket])


    return(
        <>
        <div className="header">
         <div>Project Id : {projectIdFromUrl}</div>
        </div>

          <div className="tree_and_editor flex">
              {projectId && (
            <div 
            className="bg-black pr-3 pt-2 min-w-[250px] m-2"
            style={{overflow : "auto"}}
            >
               <TreeStructure/>  
            </div>
            
            )}
        <EditorComponent/>
          </div>

          <div
          >
            <BrowserTerminal />
          </div>
         
        </>
    )
}