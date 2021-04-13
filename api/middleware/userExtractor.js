const jwt = require('jsonwebtoken')
module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  //comprobamos que authorization extiste, la pasamos a minusculas y verificamos que empieza con la palabra bearer,  bearer tokens (https://developer.mozilla.org/es/docs/Web/HTTP/Authentication)
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7) // extraemos la cadena del token sin "Bearer mF_9.B5f...."
  }

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
  } catch (e) { console.log(e) }

  if (!token || !decodedToken.id) {
    return response.status(401).send({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId //mutamos el objeto request y le pasamos el userId

  next()
}