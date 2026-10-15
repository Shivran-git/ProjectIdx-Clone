import Editor from '@monaco-editor/react'
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { extensionToFileType } from '../../../utils/extensionToFileType';

export const EditorComponent = ()=>{

    let timerId = null ;
     const {editorSocket} = useEditorSocketStore();
    const {activeFileTab} = useActiveFileTabStore();

const [editorState, setEditorState] = useState({
       theme : null 
})



async function downloadTheme() {
    const response = await fetch('/Dracula.json');
    const data = await response.json();
    setEditorState({...editorState, theme :data});
    
}

   useEffect(()=>{
   downloadTheme();
   }, [])

  
function handleChange(value, event){

    if(timerId !== null){
        clearTimeout(timerId) ;
    }
   

   timerId = setTimeout(()=>{
    console.log("sending write file")
     editorSocket.emit("writeFile", {
        data : value, 
        pathToFileOrFolder : activeFileTab.path 
    })
   }, 2000);
         
}
 

   function handleEditorTheme(editor, monaco){
             monaco.editor.defineTheme('dracula', editorState.theme);
             monaco.editor.setTheme('dracula');
        }

        function handleEditorValidation(markers){
            markers.forEach(marker => {
                console.log("onValidate : ", marker.message)
            });
        }
    return (
        <>
        <div className='flex col items-center justify-center'>
         <Card hoverable={true} title="Java" variant="borderless" style={{ width:900 }}>

        {editorState.theme &&  <Editor
        height={'90vh'}
        width={'100%'}
        theme='vs-dark'
        defaultLanguage={extensionToFileType(activeFileTab?.extension)}
        language={extensionToFileType(activeFileTab?.extension)}
        value={activeFileTab?.value}
        onChange={handleChange}
        defaultValue='// Welcome to the playground'
        options={{
            fontFamily :'helvetica',
            fontSize : '18'
        }}
        onValidate={handleEditorValidation}
        onMount={handleEditorTheme}
        />}

         </Card>
       
        </div>
       </>
    )
}