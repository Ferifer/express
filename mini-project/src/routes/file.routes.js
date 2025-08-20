const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { uploadFile, getFile } = require("../controllers/file.controller");

// Endpoint untuk upload file
router.post("/upload", upload.single("file"), uploadFile);

// Endpoint untuk mendapatkan file
router.get("/upload/:filename", getFile);

module.exports = router;
