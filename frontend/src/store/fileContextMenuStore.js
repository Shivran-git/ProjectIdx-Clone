import {create} from 'zustand'

export const useFileContextMenueStore = create((set)=>({
    x : null ,
    y : null ,
    file : null,
    isOpen : false ,
    renameBoxForFile : false,
    setX : (incomingX) =>{
        set({ 
            x : incomingX
        })
    },

    setY : (incomingY) =>{
        set({
            y : incomingY
        })
    }, 

    setIsOpen : (incomingIsOpen)=>{
        set({
            isOpen : incomingIsOpen
        })
    },

    setFile : (incomingFile)=>{
        console.log("file is set successfulyy ")
        set({
            file : incomingFile
        })
    },

    setRenameBoxForFile : (incomingIsOpen)=>{
         set({
            renameBoxForFile : incomingIsOpen
         })
    }

}))