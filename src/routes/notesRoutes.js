import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// Add authenticate middleware before all router starts /notes
router.use('/notes', authenticate);

// GET/ notes
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// GET/ notes /: noteId
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// POST / notes
router.post('/notes', celebrate(createNoteSchema), createNote);

// DELETE /notes/: noteId
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

// PATCH /notes/:noteId
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
