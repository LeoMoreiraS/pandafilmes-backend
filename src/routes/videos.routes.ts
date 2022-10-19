import { Router, Request, Response } from "express";
import path from 'path';
export const videosRoutes =  Router();

import { JsonDB, Config } from 'node-json-db';
import { GetVideosController } from "../controllers/GetVideosController";
import { StreamVideoController } from "../controllers/StreamVideoController";


const getVideosController = new GetVideosController();
const streamVideoController = new StreamVideoController();

videosRoutes.get('/videos',getVideosController.handle);

videosRoutes.get("/video/:id",streamVideoController.handle);


videosRoutes.get("/video-test/:id",async (request:Request,response:Response)=>{
    const db = new JsonDB(new Config("myDataBase", true, false, '/'));

    interface FooBar {
        Hello: string
        World: number
    }
    const object = {Hello: "World", World: 5} as FooBar;

    await db.push("/test", object);

    //Will be typed as FooBar in your IDE
    const result = await db.getObject<FooBar>("/test");

    console.log(result)

    response.sendFile('videos/video.mp4',{root:path.resolve()});
});