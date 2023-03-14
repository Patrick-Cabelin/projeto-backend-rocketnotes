const { Router } = require('express')
const notesRoutes = Router()

const NotesController = require('../controllers/NotesControllers')
const notesController = new NotesController()
const ensureAuthenticated = require('../middlewere/ensureAuthenticated')

notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/',notesController.Index)
notesRoutes.post('/',notesController.Create)
notesRoutes.get('/:id',notesController.Show)
notesRoutes.delete('/:id',notesController.Delete)


module.exports = notesRoutes