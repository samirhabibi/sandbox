import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { ImageDao } from '@daos/ImageDao';
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();
const imageDao = new ImageDao();

/******************************************************************************
 *                      Get All Images - "GET /api/images/all"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    const images = await imageDao.getAll();
    return res.status(OK).json({ images });
});

/******************************************************************************
 *                      Get One Images - "GET /api/images/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const image = await imageDao.get(Number(id));
    return res.status(OK).json({ image });
});


/******************************************************************************
 *                       Add One - "POST /api/images/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { title, description, source } = req.body;
    if (!title || !description || !source) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await imageDao.add(title, description, source);
    return res.status(CREATED).end();
});



/******************************************************************************
 *                    Delete - "DELETE /api/images/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await imageDao.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
