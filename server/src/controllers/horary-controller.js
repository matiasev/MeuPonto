const repository = require("../repositories/horary-repository")
const authService = require("../services/auth-service")

exports.get = async(req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)

  try {
    const data = await repository.get(dataToken.id)
    res.status(200).send(data)
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição.', data: e
    })
  }
}

exports.getById = async(req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)

  try {
    const data = await repository.getById(req.params.id)
    res.status(201).send(data)
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição.', data: e
    })
  }
}

exports.post = async(req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)

  try {
    await repository.create({
      day: req.body.day,
      start: req.body.start,
      startLunch: req.body.startLunch,
      endLunch: req.body.endLunch,
      end: req.body.end,
      user: dataToken.id
    })
    res.status(201).send({
      message: "Horário registrado com sucesso!"
    })
  } catch (e) {
    res.status(400).send({
      message: "Falha ao registrar horário!", data: e
    })
  }
}

exports.put = async(req, res) => {
  // const token = req.body.token || req.query.token || req.headers['x-access-token']
  // const dataToken = await authService.decodeToken(token)
  try {
    await repository.update(req.params.id, req.body)
    res.status(200).send({
      message: "Horário atualizado com sucesso!"
    })
  } catch (e) {
    res.status(400).send({
      message: "Falha ao atualizar horário!", data: e
    })
  }
}

exports.delete = async(req, res) => {
  try {
    await repository.remove(req.params.id)
    res.status(200).send({
      message: "Horário removido com sucesso!"
    })
  } catch (e) {
    res.status(400).send({
      message: "Falha ao remover horário!", data: e
    })
  }
}