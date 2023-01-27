const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class PlatesAvatarController {
  async updateImg(request, response) {
    const plates_id = request.plates.id

    const avatarFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const plate = await knex('plates').where({ id: plates_id }).first()
    if (!plate) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }
    if (plate.avatar) {
      await diskStorage.deleteFile(plate.avatar)
    }
    const filename = await diskStorage.saveFile(avatarFilename)
    plate.avatar = filename
    await knex('plates').update(plate).where({ id: plate_id })

    return response.json(plate)
  }
}
module.exports = PlatesAvatarController
