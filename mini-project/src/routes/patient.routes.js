const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const { createPatientValidation } = require("../validation/patient.validation");
const validate = require("../middleware/validate");

// CRUD pasien
router.get("/", patientController.getAllPatients.bind(patientController));
router.get("/:id", patientController.getPatientById.bind(patientController));

router.post(
  "/",
  createPatientValidation, //<===
  validate, //<===
  patientController.createPatient.bind(patientController)
);

router.put("/:id", patientController.updatePatient.bind(patientController));
router.delete("/:id", patientController.deletePatient.bind(patientController));

// Dapatkan semua kunjungan pasien
router.get(
  "/:id/visits",
  patientController.getPatientVisits.bind(patientController)
);

module.exports = router;
