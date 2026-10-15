import usePing from "../../hooks/apis/queries/usePing.js";


const  PingComponent = ()=>{
    const {isLoading, data} = usePing();

if(isLoading){
  return(
    <>
    Loading.....4
    </>
  )
}
  return (
   <>
   <div>HELLO EVERYONE</div>
   <div>{data.message}</div>
   </>
  )
}

export default PingComponent