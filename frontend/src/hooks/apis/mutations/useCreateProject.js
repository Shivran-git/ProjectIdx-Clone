import { createProjectApi } from "../../../apis/projects.js";
import { useMutation } from "@tanstack/react-query";

export const useCreateProject = ()=>{
     const {mutateAsync , isPending , isSuccess, error} = useMutation({
        mutationFn : createProjectApi,
        onSuccess : (data)=>{
            console.log(data)
        },
        onError : ()=>{
            console.log("eRROR CREATING PROJECT ")
        }
     });
     
     return{
        createProjectMutation : mutateAsync,
        isPending, 
        isSuccess,
        error
     }
}