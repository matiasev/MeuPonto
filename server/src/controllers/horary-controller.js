const repository = require("../repositories/horary-repository")
const authService = require("../services/auth-service")

exports.get = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)
  try {
    const day = await verifyDayExist(dataToken.id)
    res.status(200).send(day)
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição.'
    })
  }
}

exports.getAll = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)
  try {
    const day = await repository.get(dataToken.id)
    res.status(200).send(day)
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao processar sua requisição.'
    })
  }
}

exports.getById = async (req, res) => {
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

exports.post = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await authService.decodeToken(token)
  const dayExist = await verifyDayExist(dataToken.id)
  try {
    if (!dayExist) {
      await repository.create({
        day: Date.now(),
        start: Date.now(),
        user: dataToken.id
      })
      res.status(201).send({
        message: "Horário registrado com sucesso!"
      })
    }
  } catch (e) {
    res.status(400).send({
      message: "Falha ao registrar horário!", data: e
    })
  }
}

exports.put = async (req, res) => {
  try {
    if (!req.body.end && req.body.endLunch && req.body.startLunch) {
      req.body.end = Date.now()
    }
    if (!req.body.endLunch && req.body.startLunch) {
      req.body.endLunch = Date.now()
    }
    if (!req.body.startLunch) {
      req.body.startLunch = Date.now()
    }
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

exports.delete = async (req, res) => {
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

const verifyDayExist = async (token) => {
  const data = await repository.get(token)
  const dateNow = new Date()
  const day = await data.find(d => {
    if (d.day.getDate() == dateNow.getDate()) {
      if (d.day.getMonth() == dateNow.getMonth()) {
        if (d.day.getFullYear() == dateNow.getFullYear()) {
          return d
        }
      }
    }
  })
  return day
}