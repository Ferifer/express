const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visit.controller");

// Get all visits
router.get("/", visitController.getAllVisits.bind(visitController));

// Get visit by id
router.get("/:id", visitController.getVisitById.bind(visitController));

// Tambah kunjungan untuk pasien tertentu
router.post(
  "/patients/:patientId",
  visitController.createVisit.bind(visitController)
);

// Hapus kunjungan
router.delete("/:id", visitController.deleteVisit.bind(visitController));

module.exports = router;
