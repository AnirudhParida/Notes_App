import express from 'express';
import * as NotesController from '../controllers/notes';

const Router = express.Router();

Router.get('/', NotesController.getNotes);

Router.get('/:noteid', NotesController.getNote);

Router.post('/', NotesController.createNotes);

export default Router;