import {Router} from 'express';
import {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} from '../controllers/notes.controllers';
import {isAuthenticated} from '../helpers/auth';
const router=Router();
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated,createNewNote);
router.get('/notes', isAuthenticated,renderNotes);
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit-note/:id', isAuthenticated, updateNote);
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);
export default router;