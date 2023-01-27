const knex = require('../database/knex')
class followUpController {
  async create(request, response) {
    const { name, description } = request.body
    const { id } = request.user

    const checkFollowUpExist = await knex('followUp').whereLike(
      'name',
      `${name}`
    )

    if (checkFollowUpExist[0]) {
      throw new AppError('Este seguimento já existe!')
    }

    const followUp = await knex('followUp').insert({
      name,
      description,
      user_id: id
    })
    return response.json(followUp)
  }
  async index(request, response) {
    const user = request.user.id
    const followUp = await knex('followUp')
      .where({ user_id: user })
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
