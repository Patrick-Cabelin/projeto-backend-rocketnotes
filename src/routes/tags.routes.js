const { Router } = require('express')
const tagsRoutes = Router()

const TagsController = require('../controllers/TagsControllers')
const tagsController = new TagsController()

const ensureAuthenticated = require('../middlewere/ensureAuthenticated')

tagsRoutes.get('/', ensureAuthenticated, tagsController.Index)

module.exports = tagsRoutes