import { Router, Request, Response } from "express";
import path from 'path';
export const routes =  Router();

routes.get("/videos",(request:Request,response:Response)=>{
    response.sendFile('videos/video.mp4',{root:path.resolve()});
});