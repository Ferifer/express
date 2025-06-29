const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

// CRUD pasien
router.get("/", patientController.getAllPatients.bind(patientController));
router.get("/:id", patientController.getPatientById.bind(patientController));
router.post("/", patientController.createPatient.bind(patientController));
router.put("/:id", patientController.updatePatient.bind(patientController));
router.delete("/:id", patientController.deletePatient.bind(patientController));

// Dapatkan semua kunjungan pasien
router.get(
  "/:id/visits",
  patientController.getPatientVisits.bind(patientController)
);

module.exports = router;
