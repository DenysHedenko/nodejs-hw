import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware для парсингу JSON
app.use(express.json());

// Middleware яка дозволяє робити запити з інших доменів
app.use(cors());

// Middleware для логування
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// Маршрут, який повертає всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// Маршрут, який повертає одну нотатку за її ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  const userId = Number(req.params.userId);
  res.status(200).json({
    message: `Retrieved note with ID: ${userId}`,
  });
});

// Маршрут для тестування Middleware помилки
app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong');
});

// Middleware 404 для неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
