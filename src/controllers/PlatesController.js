const knex = require('../database/knex')

class platesController {
  async index(request, response) {
    const user = request.user.id

    const followUp = await knex('followUp').where({ user_id: user }).first()
    console.log({ followUp })
    const plates = await knex('plates')
      .where({ followUp_id: followUp.id })
      .orderBy('id')
    return response.json({ followUp, plates })
  }
  async create(request, response) {
    const { name, description, ingredients, value, followUp_id, user_id } =
      request.body

    const checkPlateExist = await knex('plates').whereLike('name', `${name}`)

    if (checkPlateExist[0]) {
      throw new AppError('Este prato já existe!')
    }

    const plate = await knex('plates').insert({
      name,
      description,
      ingredients,
      value,
      followUp_id,
      user_id
    })

    return response.json({ plate })
  }
  async delete(request, response) {
    const { id } = request.params

    await knex('plates').where({ id }).delete()
    return response.json()
  }
  async update(request, response) {
    const { name, description, img, ingredients, value } = request.body
    const { id } = request.params
    const plate = await knex('plates').where({ id })

    if (!user[0]) {
      throw new AppError('Prato não encontrado!')
    }
    const checkPlateExist = await knex('plates').whereILike({ name })

    if (checkPlateExist[0]) {
      throw new AppError('Este prato já existe!')
    }

    await knex('plates').where({ id: id }).update({
      name,
      description,
      img,
      ingredients,
      value
    })
    return response.json()
  }
  async show(request, response) {
    const { id } = request.params
    const followUp = await knex('followUp').where({ id }).first()
    const plates = await knex('plates').where({ followUp_id: id }).orderBy('id')
    return response.json({ followUp, plates })
  }
}

module.exports = platesController
