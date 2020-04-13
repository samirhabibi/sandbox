import { Request, Response, Router } from "express";
import { DocumentsDao } from "@daos/DocumentsDao";
import { OK, CREATED, BAD_REQUEST } from "http-status-codes";
import { paramMissingError } from "@shared/constants";
import { ParamsDictionary } from "express-serve-static-core";

// Init shared
const router = Router();
const documentsDao = new DocumentsDao();

// Get all Documents

router.get("/", async (req: Request, res: Response) => {
  const documents = await documentsDao.getAll();
  return res.status(OK).json({ documents });
});

// GET Documents with ID

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  const image = await documentsDao.get(Number(id));
  return res.status(OK).json({ image });
});

//POST Document

router.post("/add", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await documentsDao.add(title, description);
  return res.status(CREATED).end();
});

export default router;
