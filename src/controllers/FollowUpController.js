const knex = require('../database/knex')
class followUpController {
  async create(request, response) {
    const { name, description } = request.body

    const checkFollowUpExist = await knex('followUp').whereILike({ name })

    if (checkFollowUpExist[0]) {
      throw new AppError('Este seguimento já existe!')
    }

    const followUp = await knex('plates').insert({
      name,
      description
    })
    return response.json(followUp)
  }
  async index(request, response) {
    const followUp_id = request.followUp.id

    const followUp = await knex('followUp')
      .where({ followUp_id })
      .groupBy('name')

    return response.json({ followUp })
  }
  async update(request, response) {
    const { name, description } = request.body
    const { id } = request.params
    const followUp = await knex('followUp').where({ id })

    if (!followUp[0]) {
      throw new AppError('Seguimento não encontrado!')
    }
    const checkFollowUpExist = await knex('followUp').whereILike({ name })

    if (checkFollowUpExist[0]) {
      throw new AppError('Este seguimento já existe!')
    }

    await knex('followUp').where({ id: id }).update({
      name,
      description
    })
    return response.json()
  }
  async delete(request, response) {
    const { id } = request.params

    await knex('followup').where({ id }).delete()
    return response.json()
  }
}
module.exports = followUpController
