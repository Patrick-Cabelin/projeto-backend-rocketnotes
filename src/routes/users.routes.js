const { Router } = require('express')
const usersRoutes = Router()

const multer = require('multer')
const uploadConfig = require('../config/upload')

const UsersController = require('../controllers/UsersControllers')
const usersController = new UsersController()

const UsersAvatarController = require('../controllers/UsersAvatarController')
const usersAvatarController = new UsersAvatarController()

const ensureAuthenticated = require('../middlewere/ensureAuthenticated')
const upload = multer(uploadConfig.MULTER)


usersRoutes.post('/', usersController.Create)
usersRoutes.put('/', ensureAuthenticated, usersController.Update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.Update)

module.exports = usersRoutes