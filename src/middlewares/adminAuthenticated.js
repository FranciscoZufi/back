const AppError = require('../utils/AppError')
const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

function adminAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Invalid token JWT', 401)
  }
  const [, token] = authHeader.split(' ')
  try {
    const { admin } = verify(token, authConfig.jwt.secret)
    console.log({ admin })
    // request.user = {
    //   admin: String(admin)
    // }
    if (admin == 0) {
      throw new AppError('Usuário não autorizado', 401)
    }
    return next()
  } catch {
    throw new AppError('admin Invalid token JWT', 401)
  }
}

module.exports = adminAuthenticated
