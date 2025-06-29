const AppDataSource = require("../data-source");
const Visit = require("../entities/Visit");
const Patient = require("../entities/Patient");

const visitRepo = AppDataSource.getRepository(Visit);

class VisitRepository {
  constructor() {
    this.repo = visitRepo;
  }

  async findAll() {
    return await this.repo.find({ relations: ["patient"] });
  }

  async findById(id) {
    return await this.repo.findOne({ where: { id }, relations: ["patient"] });
  }

  async create(data) {
    const visit = this.repo.create(data);
    return await this.repo.save(visit);
  }

  async remove(id) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}

module.exports = new VisitRepository();
