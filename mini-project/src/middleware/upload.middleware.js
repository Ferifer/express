const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan direktori upload ada
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Simpan file di direktori upload
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${path.basename(
      file.originalname,
      ext
    )}-${timestamp}${ext}`;
    cb(null, filename); // Format nama file: nama-timestamp.extension
  },
});

const fileFilter = (req, file, cb) => {
  // Hanya izinkan file gambar
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
