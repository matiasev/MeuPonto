
const jwt = require("jsonwebtoken")

exports.generateToken = async(data) => {
  const token = await jwt.sign(data, global.SALT_KEY, { expiresIn: "1d"})
  return token
}

exports.decodeToken = async(token) => {
  const data = await jwt.decode(token, global.SALT_KEY)
  return data
}

exports.authorize = async(req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Acesso Restrito!'
    })
  } else {
    await jwt.verify(token, global.SALT_KEY, (error, decode) => {
      if (error) {
        res.status(401).send({
          message: 'Token Inválido!'
        })
      } else {
        next()
      }
    })
  }
}