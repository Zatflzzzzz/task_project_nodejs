// src/app.ts
import express from 'express';
import appealRouter from './routes/appeal.routes';

const app = express();

app.use(express.json());

app.use('/api', appealRouter);

export default app;