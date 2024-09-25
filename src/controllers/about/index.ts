import { Router } from "express";

import {
  createAbout,
  getAbout,
  editAbout,
} from "../../modules/about/about.service";
import {
  createAboutSchema,
  editAboutSchema,
} from "../../modules/about/about.schema";
import validation from "../../lib/middlewares/validation";
import { verifyToken } from "../../utils/auth";
import multer from "multer";
import fs from "fs";
import { storage } from "../../utils/multer.config";

const upload = multer({ storage });
const router = Router();

router.post(
  "/createAbout",
  verifyToken,
  upload.single("image"),
  validation(createAboutSchema),
  async (req, res) => {
    try {
      console.log(req.file);
      if (!req.file) {
        return res.status(400).json({ message: "Nenhuma imagem foi enviada" });
      }

      const newAbout = await createAbout(
        req.body,
        req.user as any,
        req.fullName as any,
        req.file.path as any
      );
      if (newAbout) {
        return res.status(201).json({ newAbout });
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
router.get("/getAbout", verifyToken, async (req, res) => {
  try {
    const about = await getAbout(req.user as any);
    if (about) {
      return res.status(200).json({ about });
    }
    return res.status(404).json({ message: "Nenhum sobre encontrado" });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});
router.patch(
  "/editAbout",
  verifyToken,
  validation(editAboutSchema),
  async (req, res) => {
    try {
      const about = await editAbout(req.body, req.user as any);
      if (about) {
        return res.status(200).send(about);
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

export default router;
