import { Router } from "express";

import {
  createOrUpdateLinks,
  getLinks,
  editLink,
  deleteLink,
} from "../../modules/link/link.service";
import {
  createLinkSchema,
  editLinkSchema,
  deleteLinkSchema,
} from "../../modules/link/link.schema";
import validation from "../../lib/middlewares/validation";
import { verifyToken } from "../../utils/auth";

const router = Router();

router.post(
  "/createLink",
  verifyToken,
  validation(createLinkSchema),
  async (req, res) => {
    try {
      const newLink = await createOrUpdateLinks(req.body, req.user as any);
      if (newLink) {
        return res.status(201).json({ newLink });
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
router.get("/getLinks", verifyToken, async (req, res) => {
  try {
    const links = await getLinks(req.user as any);
    if (links) {
      return res.status(200).send(links);
    }
    return res.status(404).json({ message: "Nenhum link encontrado" });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});
router.patch(
  "/editLink",
  verifyToken,
  validation(editLinkSchema),
  async (req, res) => {
    try {
      const link = await editLink(req.body, req.user as any);
      if (link) {
        return res.status(200).json({ link });
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
router.delete(
  "/deleteLink",
  verifyToken,
  validation(deleteLinkSchema),
  async (req, res) => {
    try {
      const deletedLink = await deleteLink(req.body);
      if (deletedLink)
        return res.status(200).json({ message: "Link deletado com sucesso" });

      return res.status(404).json({ message: "Link não encontrado" });
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);

export default router;
