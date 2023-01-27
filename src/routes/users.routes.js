const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const adminAuthenticated = require('../middlewares/adminAuthenticated')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', ensureAuthenticated, usersController.update)
usersRoutes.delete('/:id', adminAuthenticated, usersController.delete)

module.exports = usersRoutes
