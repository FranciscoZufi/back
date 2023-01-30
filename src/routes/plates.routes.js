const { Router } = require('express')
const PlatesController = require('../controllers/PlatesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const PlatesAvatarController = require('../controllers/PlatesAvatarController')
const uploadConfig = require('../configs/upload')
const multer = require('multer')
const adminAuthenticated = require('../middlewares/adminAuthenticated')

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController()
const platesAvatarController = new PlatesAvatarController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.post('/', adminAuthenticated, platesController.create)
platesRoutes.get('/', platesController.index)
platesRoutes.put('/:id', adminAuthenticated, platesController.update)
platesRoutes.patch(
  '/:id',
  adminAuthenticated,
  upload.single('avatar'),
  platesAvatarController.update
)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', adminAuthenticated, platesController.delete)

module.exports = platesRoutes
