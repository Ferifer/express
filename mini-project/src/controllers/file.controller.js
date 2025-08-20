const path = require("path");
const fs = require("fs");

class FileController {
  uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "No file uploaded or invalid file type",
        });
      }
      res.status(200).json({
        status: 200,
        message: "File uploaded successfully",
        data: { filePath: `/uploads/${req.file.filename}` },
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message || "File upload failed",
      });
    }
  }

  getFile(req, res) {
    try {
      const uploadDir = path.join(__dirname, "../../uploads");
      const filePath = path.join(uploadDir, req.params.filename);

      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({
          status: 404,
          message: "File not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message || "Failed to retrieve file",
      });
    }
  }
}

module.exports = new FileController();
