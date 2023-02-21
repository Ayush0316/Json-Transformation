const express = require("express")
const controller = require("../controllers/convertor/convertorController")
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/output", upload.array("source"), controller.output)

module.exports = router;