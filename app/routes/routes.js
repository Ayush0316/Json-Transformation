const express = require("express")
const controller = require("../controllers/convertor/convertorController")
const router = express.Router();
router.post("/output" , controller.output)

module.exports = router;