const { Router } = require('express')
const notesRoutes = Router()

const NotesController = require('../controllers/NotesControllers')
const notesController = new NotesController()

notesRoutes.post('/:user_id',notesController.Create)
notesRoutes.get('/:id',notesController.Show)
notesRoutes.delete('/:id',notesController.Delete)


module.exports = notesRoutes