import {IGetVideosService} from './IGetVideosService'
import path from 'path';
import fs from 'fs';

export class GetVideosService implements IGetVideosService {


    private static instance: GetVideosService;
    
    private constructor() {}
    
    public static getInstance(): GetVideosService {
        if (!this.instance) {
            this.instance = new GetVideosService();
            return this.instance;
        } else {
            return this.instance;
        }
    }

    execute(): string[] {
        const videos = fs.readdirSync(path.resolve("videos"));
        console.log(videos)
        videos.shift();

        return videos;
    }


}
