import {create} from 'zustand'
import { useActiveFileTabStore } from './activeFileTabStore';
import { useTreeStore } from './treeStructureStore';
import { useFileContextMenueStore } from './fileContextMenuStore';
import { useFolderContextMenueStore } from './folderContextMenuStore';

export const useEditorSocketStore = create((set)=>(
    {
        editorSocket : null,
        setEditorSocket : (incomingSocket)=>{

            const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab ;

              incomingSocket?.on("readFileSuccess", (data)=>{
                console.log("Read file success ", data) ;
                const fileExtension = data.path.split('.').pop();
                activeFileTabSetter(data.path, data.value , fileExtension );
              });

              incomingSocket?.on("writeFileSuccess", (data)=>{
                console.log(data) ;
                incomingSocket.emit("readFile", {
                  pathToFileOrFolder : useActiveFileTabStore.getState().activeFileTab.path 
                })
              })

              incomingSocket?.on("deletedFolderSuccess", (data)=>{
                console.log(data);
                useTreeStore.getState().setTreeStructure() ;
                useFolderContextMenueStore.getState().setIsOpen(false);
              })

              incomingSocket?.on("renameFileSuccess", (data)=>{
                console.log(data);
                useTreeStore.getState().setTreeStructure() ;
              })

            set({
                editorSocket : incomingSocket
            })
        }
    }
))