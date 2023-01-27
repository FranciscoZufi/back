const { Router } = require('express')
const FollowUpController = require('../controllers/FollowUpController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const followUpRoutes = Router()

const followUpController = new FollowUpController()

followUpRoutes.post('/', followUpController.create)
followUpRoutes.get('/', followUpController.index)
followUpRoutes.put('/:id', ensureAuthenticated, followUpController.update)

module.exports = usersRoutes
