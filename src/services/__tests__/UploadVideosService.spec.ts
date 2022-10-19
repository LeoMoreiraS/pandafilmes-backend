import { UploadVideosService } from "../UploadVideosService";

describe('Upload Videos Service Test', () => { 
    const uploadVideosService = UploadVideosService.getInstance();
    beforeAll(()=>{

    })

    it("Should not upload a video if it is not a .mp4",()=>{
        const fakeFile:Express.Multer.File = {
            originalname: "InvalidFile.invalid",            
        }as Express.Multer.File;

        try{
            uploadVideosService.execute(fakeFile);
            expect(true).toBeFalsy();
        }catch(error){
            if(error instanceof Error){
                expect(error.message).toBe("Invalid format passed to uploadVideos");
            }else{
                expect(true).toBeFalsy();
            }
        }
    })

    it("Should not upload a empty video",()=>{
        const fakeFile:Express.Multer.File = {} as Express.Multer.File;

        try{
            uploadVideosService.execute(fakeFile);
            expect(true).toBeFalsy();
        }catch(error){
            if(error instanceof Error){
                expect(error.message).toBe("Invalid format passed to uploadVideos");
            }else{
                expect(true).toBeFalsy();
            }
        }
    })

 })