const AppError = require('../utils/AppError')

function adminAuthenticated(request, response, next) {
  const user = request.user
  if (user.admin === 0) {
    throw new AppError('Usuário não autorizado', 401)
  }
  next()
}

module.exports = adminAuthenticated
