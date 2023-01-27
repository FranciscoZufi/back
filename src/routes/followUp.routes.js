const { Router } = require('express')
const FollowUpController = require('../controllers/FollowUpController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const adminAuthenticated = require('../middlewares/adminAuthenticated')

const followUpRoutes = Router()

const followUpController = new FollowUpController()

followUpRoutes.use(ensureAuthenticated)

followUpRoutes.post('/', adminAuthenticated, followUpController.create)
followUpRoutes.get('/', followUpController.index)
followUpRoutes.put('/:id', adminAuthenticated, followUpController.update)
followUpRoutes.delete('/:id', adminAuthenticated, followUpController.delete)

module.exports = followUpRoutes
