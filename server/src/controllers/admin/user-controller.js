const repository = require("../../repositories/admin/user-repository")
const md5 = require("md5")
const authService = require("../../services/auth-service")

exports.post = async(req, res) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })

    res.status(201).send({
      message: "Cadastro efetuado com sucesso!"
    })
  } catch (e) {
    res.status(500).send({
      message: "Falha ao efetuar cadastro!", data: e
    })
  }
}

exports.authenticate = async(req, res) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })

    if (!user) {
      res.status(404).send({
        message: 'Usuário ou senha inválidos!'
      })
      return
    }

    const token = await authService.generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password
    })

    res.status(201).send({
      token: token,
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição.', data: e
    })
  }
}