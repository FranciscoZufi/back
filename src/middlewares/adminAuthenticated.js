const AppError = require('../utils/AppError')
const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

function adminAuthenticated(request, response, next) {
  const user = request.user
  if (user.admin === 0) {
    throw new AppError('Usuário não autorizado', 401)
  }
  next()
}

module.exports = adminAuthenticated
