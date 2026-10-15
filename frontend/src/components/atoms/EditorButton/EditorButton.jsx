import { useActiveFileTabStore } from '../../../store/activeFileTabStore.js';
import {CloseSquareFilled} from '@ant-design/icons'

import './EditorButton.css'
import { useState } from 'react';

export const EditorButton = ({isActive})=>{


const [visible, setVisible] = useState(true);


    return(
        <>
        {visible && <button className="editor-button"  style={
            {color : isActive ? 'white' : '#d6d0d0',
                backgroundColor : isActive ? '#3f3838' : '#000000' ,
                borderTop : isActive ? '4px solid #20f583' : 'none'
             }
           }
           >

          <span>HelloWorld.js</span>
          <CloseSquareFilled onClick={()=> setVisible(false)}/>

        </button>}
        </>
    )
}