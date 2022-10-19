import path from "path";
import fs from "fs";
import { IDeleteVideosService } from "./IDeleteVideosService";

export class DeleteVideosService implements IDeleteVideosService {
  private static instance: IDeleteVideosService;

  private constructor() {}

  public static getInstance(): IDeleteVideosService {
    if (!this.instance) {
      this.instance = new DeleteVideosService();
      return this.instance;
    } else {
      return this.instance;
    }
  }

  execute(filename: string) {
    const filePath = path.resolve("videos", filename);

    const fileBusy = fs.statSync(filePath);
    console.log(fileBusy);
    const fileExists = fs.existsSync(filePath);
    console.log(fileExists)

    if (!fileExists) {
      throw new Error("No such file");
    }
    fs.unwatchFile(filePath);
    fs.unlinkSync(filePath);
  }
}
