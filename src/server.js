import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { notFoundHandler } from './middleware/notFoundHandler';
import { connectMongoDB } from './db/connectMongoDB';

const app = express();
const PORT = process.env.PORT ?? 3000;

//? ==========================================================
// Middleware для логування
app.use(logger);

// Middleware для парсингу JSON
app.use(express.json());

// Middleware яка дозволяє робити запити з інших доменів
app.use(cors());

//* ==========================================================
// Маршрут, який повертає всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// Маршрут, який повертає одну нотатку за її ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Middleware 404 для неіснуючих маршрутів
app.use(notFoundHandler);

//! ==========================================================
// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
