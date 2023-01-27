const { Router } = require('express')
const usersRoutes = require('./users.routes')
const followUpRoutes = require('./followUp.routes')
const platesRoutes = require('./plates.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/followUp', followUpRoutes)
routes.use('/plates', platesRoutes)

module.exports = routes
