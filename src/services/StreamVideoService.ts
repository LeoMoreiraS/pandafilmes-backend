import { IStreamVideoService } from "./IStreamVideoService";
import { Request, Response } from "express";
import fs from "fs";

export class StreamVideoService implements IStreamVideoService {
  private static instance: IStreamVideoService;

  private constructor() {}

  public static getInstance(): IStreamVideoService {
    if (!this.instance) {
      this.instance = new StreamVideoService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(request: Request, response: Response) {
    const path = `videos/${request.params.id}`;

    const videoRange = request.headers.range;

    const videoStreamStatus = fs.statSync(path);

    const fileSize = videoStreamStatus.size;

    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      const file = fs.createReadStream(path, { start, end });
      response.writeHead(206, head);
      file.pipe(response);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      response.writeHead(200, head);
      fs.createReadStream(path).pipe(response);
    }
  }
}
