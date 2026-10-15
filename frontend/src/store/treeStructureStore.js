import {create} from 'zustand';
import { QueryClient } from '@tanstack/react-query';
import { getProjectTree } from '../apis/projects.js';

export const useTreeStore = create((set, get)=>{

    const queryClient = new QueryClient();
    return {
        projectId : null ,
        treeStructure : null ,
        setTreeStructure :async ()=>{
            
             const data = await queryClient.query({
                queryFn : ()=> getProjectTree({projectId : get().projectId}),
                queryKey : [`projectTree-${get().projectId}`]
             });
             console.log(data);
            set({
                treeStructure : data
            })
        },
        setProjectId:(projectId)=>{
            set({
                projectId : projectId
            })
        }
    }
})