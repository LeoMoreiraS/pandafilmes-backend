import { Request, Response } from "express";
import { UploadVideosService } from "../services/UploadVideosService";


export class UploadVideosController {
  async handle(request: Request, response: Response) {
    const file = request.file;

    const uploadVideosService = UploadVideosService.getInstance();

    try{
        if(!file){
            throw new Error("No such file!");
        }

        uploadVideosService.execute(file);
    }catch(error){
        let message = 'Error'
        if(error instanceof  Error) message = error.message;
        return response.status(400).json(message);
    }

    return response.status(201).send(file.originalname);
   
  }
}
