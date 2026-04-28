import express from 'express';
import cors from 'cors';
import benefitsRouter from './routes/benefits';
import userRouter from './routes/user';
import chatRouter from './routes/chat';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/benefits', benefitsRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Benefits Maximizer API running on http://localhost:${PORT}`);
});
