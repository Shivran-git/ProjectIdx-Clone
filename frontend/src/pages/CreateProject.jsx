import { useCreateProject } from "../hooks/apis/mutations/useCreateProject.js"
import {Button, Spin} from 'antd'
import {Flex, Layout} from 'antd';
import { useNavigate } from "react-router";

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  margin: 5,
  
  
  backgroundColor: '#4096ff',
};
const {Header, Footer,  Content} = Layout ;

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
};

export const  CreateProject = ()=>{
const navigate = useNavigate();

const {createProjectMutation, isPending} = useCreateProject();
    async function handleCreateProject(){

             console.log("Going to trigger the API .")
             try{
             const data =    await  createProjectMutation();
             console.log(data.projectId)
                console.log("Now we will be redirected to the editor .")
               navigate(`/projects/${data.projectId}`)
             }catch(error){
                console.log("error IN CREATING PROJECT");
             }
    }
  return (
   <Flex gap="medium" vertical >
           <Layout style={layoutStyle}>
      <Header style={headerStyle}>
         Create Project
      </Header>

      <Content>
     <Button
         onClick= {handleCreateProject}
      >
         CREATE PLAYGROUND
      </Button>
       {isPending && <Spin fullscreen/>}
      </Content>

      <Footer>
           FOOTER 
      </Footer>
   </Layout>
   </Flex>
   
  )
}



   // <div>
   //    <Button
         
   //    onClick= {handleCreateProject}
   //    >

   //       CREATE PLAYGROUND
   //    </Button>
   //    {isPending && <Spin fullscreen/>}
   //    </div>
   //    </>