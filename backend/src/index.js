import express from 'express';
import cors from 'cors' ;
import cookieParser from 'cookie-parser';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js'



const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());

app.use('/api', apiRouter);

app.get('/ping',(req, res)=>{
    return res.json({ message : "pong"})
})


app.all('/{*splat}', (req, res)=>{
    return res.status(404).json({
        message : "NOT FOUND"
    })
})
app.listen(PORT, ()=>{
    console.log("server is running ");
})

