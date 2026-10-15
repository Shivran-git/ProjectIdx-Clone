import { create } from "zustand";

export const useFolderContextMenueStore = create((set)=>({
  x : null ,
    y : null ,
    folder : null,
    isOpen : false ,
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

    setFolder : (incomingFile)=>{
        console.log("file is set successfulyy ")
        set({
            folder : incomingFile
        })
    }
}))