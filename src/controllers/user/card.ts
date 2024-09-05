import { Router } from "express";

import { getAbout } from "../../modules/about/about.service";
import { getLinks } from "../../modules/link/link.service";

const router = Router();

router.get("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const about = await getAbout(user as any);
    const links = await getLinks(user as any);
    if (about && links) {
      return res.status(200).json({ about, links });
    }
    return res.status(400).json({ message: "Card não encontrado" });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

export default router;
