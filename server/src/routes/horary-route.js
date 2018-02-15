const express = require("express")
const router = express.Router()
const controller = require('../controllers/horary-controller')

router.get("/", controller.get)
router.g("/:id", controller.getById)
router.post("/", controller.post)
router.put("/:id", controller.put)

module.exports = router