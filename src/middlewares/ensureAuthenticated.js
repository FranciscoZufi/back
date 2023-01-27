const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Invalid token JWT', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { payload } = verify(token, authConfig.jwt.secret)
    request.user = {
      admin: payload.admin,
      id: payload.user_id
    }
    return next()
  } catch {
    throw new AppError('Invalid token JWT', 401)
  }
}

module.exports = ensureAuthenticated
