import express from 'express';
import cors from 'cors' ;
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js'
import chokidar from 'chokidar'
import path from 'path'
import queryString from 'query-string'
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import { handleContainerCreate } from './containers/handleContainerCreate.js';


const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin : '*',
        method : ['GET', 'POST'] 
    }
}) ;


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());



const editorNamespace = io.of('/editor') ;
const terminalNamespace = io.of('/terminal') ;

terminalNamespace.on('connection', (socket)=>{
    console.log("terminal connected") ;

        let projectId  = socket.handshake.query.projectId ;
           handleContainerCreate(projectId, socket) ;

    // socket.on("shell-input", (data)=>{
    //     console.log("terminal command typed :", data);
    //     socket.emit("shell-output", data);
    // })

    socket.on("disconnect", ()=>{
        console.log("terminal disconnected .")
    })
})

editorNamespace.on('connection', (socket)=>{
    console.log("Editor connected");
    let projectId  = socket.handshake.query.projectId ;

console.log(projectId) ;
    if(projectId){

        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored : (path)=> path.includes("node_modules"),
            persistent : true , // keeps the watcher in runnings state till the app is running .

            awaitWriteFinish : {
                stabilityThreshold : 2000, // ensure stability of file before triggering .,
            },
            ignoreInitial : true 
        });

        watcher.on('all',(event,path)=>{
            console.log(event, path) ;
        })
    }

   handleEditorSocketEvents(socket, editorNamespace);

    // socket.on("disconnect", async()=>{
    //     await watcher.close() ;
    //     console.log("watcher disconnected");
    // } )
})

app.use('/api', apiRouter);
app.get('/ping',(req, res)=>{
    return res.json({ message : "pong"})
})

app.all('/{*splat}', (req, res)=>{
    return res.status(404).json({
        message : "NOT FOUND"
    })
})
server.listen(PORT, ()=>{
    console.log("server is running ");
})

