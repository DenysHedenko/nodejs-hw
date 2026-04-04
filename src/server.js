import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

//? ==========================================================
// Middleware для логування
app.use(logger);

// Middleware для парсингу JSON
app.use(express.json());

// Middleware яка дозволяє робити запити з інших доменів
app.use(cors());

// Middleware яка дозволяє парсити cookies
app.use(cookieParser());

//* ==========================================================
// Add groupe of note's routes
app.use(notesRoutes);

// Middleware 404 для неіснуючих маршрутів
app.use(notFoundHandler);

//! ==========================================================
//Middleware for errors from celebrate (validation)
app.use(errors());

// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
