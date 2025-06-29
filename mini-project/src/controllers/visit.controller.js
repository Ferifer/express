const visitRepo = require("../repository/visit.repository");

class VisitController {
  async getAllVisits(req, res) {
    const visits = await visitRepo.findAll();
    res.json({
      status: 200,
      message: "List of visits",
      data: visits,
    });
  }

  async getVisitById(req, res) {
    const visit = await visitRepo.findById(req.params.id);
    if (!visit)
      return res.status(404).json({ status: 404, message: "Visit not found" });
    res.json({
      status: 200,
      message: "Visit found",
      data: visit,
    });
  }

  async createVisit(req, res) {
    try {
      const patientId = req.params.patientId;
      const data = { ...req.body, patientId };
      const newVisit = await visitRepo.create(data);
      res.status(201).json({
        status: 201,
        message: "Visit created",
        data: newVisit,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Failed to create visit",
        error: err.message,
      });
    }
  }

  async deleteVisit(req, res) {
    try {
      const deleted = await visitRepo.remove(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ status: 404, message: "Visit not found" });
      res.json({ status: 200, message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Failed to delete visit",
        error: err.message,
      });
    }
  }
}

module.exports = new VisitController();
