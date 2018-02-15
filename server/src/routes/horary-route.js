const express = require("express")
const router = express.Router()

const authService = require("../services/auth-service")
const controller = require('../controllers/horary-controller')

router.get("/", authService.authorize, controller.get)
router.get("/:id", authService.authorize, controller.getById)
router.post("/", authService.authorize, controller.post)
router.put("/:id", authService.authorize, controller.put)
router.delete("/:id", authService.authorize, controller.delete)

module.exports = router