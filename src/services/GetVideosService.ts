import { IGetVideosService, Movie } from "./IGetVideosService";
import path from "path";
import fs from "fs";

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

  execute(): Movie[] {
    const videos = fs.readdirSync(path.resolve("videos"));
    videos.shift();

    const response: Movie[] = [];

    videos.forEach((video) => {
      response.push({
        id: video,
        title: video.replace(".mp4", ""),
      });
    });

    return response;
  }
}
