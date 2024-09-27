import multer, { DiskStorageOptions, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

type Callback = (error: Error | null, destination: string) => void;

export const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: Callback
  ): void => {
    const uploadDir = "src/uploadsImages";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    callback(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: Callback
  ): void => {
    const time = new Date().getTime();
    const extName = path.extname(file.originalname);
    callback(null, `${time}${extName}`);
  },
});
