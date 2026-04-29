import { Router, Request, Response } from 'express';
import { userData } from '../data/user';

const router = Router();

router.get('/profile', (_req: Request, res: Response) => {
  res.json(userData);
});

export default router;
