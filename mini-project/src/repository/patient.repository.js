const AppDataSource = require("../data-source");
const Patient = require("../entities/Patient");

class PatientRepository {
  constructor() {
    this.repo = AppDataSource.getRepository(Patient);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id) {
    return await this.repo.findOne({ where: { id }, relations: ["visits"] });
  }

  async create(data) {
    const patient = this.repo.create(data);
    return await this.repo.save(patient);
  }

  async update(id, data) {
    const patient = await this.repo.findOneBy({ id });
    if (!patient) return null;
    this.repo.merge(patient, data);
    return await this.repo.save(patient);
  }

  async remove(id) {
    const result = await this.repo.delete(id);
    return result.affected > 0;
  }
}

module.exports = new PatientRepository();
