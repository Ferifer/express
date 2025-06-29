const patientRepo = require("../repository/patient.repository");

class PatientController {
  async getAllPatients(req, res) {
    const patients = await patientRepo.findAll();
    res.json({
      status: 200,
      message: "List of patients",
      data: patients,
    });
  }

  async getPatientById(req, res) {
    const patient = await patientRepo.findById(req.params.id);
    if (!patient)
      return res
        .status(404)
        .json({ status: 404, message: "Patient not found" });
    res.json({
      status: 200,
      message: "Patient found",
      data: patient,
    });
  }

  async createPatient(req, res) {
    const data = req.body;
    const newPatient = await patientRepo.create(data);
    res.status(201).json({
      status: 201,
      message: "Patient created",
      data: newPatient,
    });
  }

  async updatePatient(req, res) {
    const updated = await patientRepo.update(req.params.id, req.body);
    if (!updated)
      return res
        .status(404)
        .json({ status: 404, message: "Patient not found" });
    res.json({
      status: 200,
      message: "Patient updated",
      data: updated,
    });
  }

  async deletePatient(req, res) {
    const deleted = await patientRepo.remove(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: 404, message: "Patient not found" });
    res.json({ status: 200, message: "Deleted successfully" });
  }

  async getPatientVisits(req, res) {
    const patient = await patientRepo.findById(req.params.id);
    if (!patient)
      return res
        .status(404)
        .json({ status: 404, message: "Patient not found" });
    res.json({
      status: 200,
      message: "List of patient visits",
      data: patient.visits,
    });
  }
}

module.exports = new PatientController();
