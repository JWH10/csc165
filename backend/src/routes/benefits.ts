import { Router, Request, Response } from 'express';
import { benefitsData, Benefit } from '../data/benefits';

const router = Router();

let benefits: Benefit[] = [...benefitsData];

router.get('/', (_req: Request, res: Response) => {
  res.json(benefits);
});

router.get('/:id', (req: Request, res: Response) => {
  const benefit = benefits.find(b => b.id === req.params.id);
  if (!benefit) {
    res.status(404).json({ error: 'Benefit not found' });
    return;
  }
  res.json(benefit);
});

router.patch('/:id/claim', (req: Request, res: Response) => {
  const index = benefits.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Benefit not found' });
    return;
  }
  benefits[index] = {
    ...benefits[index],
    percentUsed: 100,
    status: 'maximized',
    claimed: true,
  };
  res.json(benefits[index]);
});

export default router;
