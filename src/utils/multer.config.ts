import multer, { DiskStorageOptions, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

type Callback = (error: Error | null, destination: string) => void;

export const storage = multer.memoryStorage();
export const upload = multer({ storage });
