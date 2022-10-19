import path from "path";
import fs from "fs";
import { IDeleteVideosService } from "./IDeleteVideosService";

export class DeleteVideosService implements IDeleteVideosService {
  private static instance: DeleteVideosService;

  private constructor() {}

  public static getInstance(): DeleteVideosService {
    if (!this.instance) {
      this.instance = new DeleteVideosService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(filename: string) {
    const filePath = path.resolve("videos", filename);

    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      throw new Error("No such file");
    }

    fs.rmSync(filePath);
  }
}
