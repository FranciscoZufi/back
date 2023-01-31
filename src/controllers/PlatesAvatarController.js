const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class PlatesAvatarController {
  async update(request, response) {
    const { id } = request.params

    const imgFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const plate = await knex('plates').where({ id }).first()
    if (!plate) {
      throw new AppError('Este prato não existe!', 401)
    }
    if (plate.img) {
      await diskStorage.deleteFile(plate.img)
    }
    const filename = await diskStorage.saveFile(imgFilename)
    plate.img = filename
    await knex('plates').update(plate).where({ id })

    return response.json(plate)
  }
}
module.exports = PlatesAvatarController
