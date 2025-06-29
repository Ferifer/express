const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Visit",
  tableName: "visits",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    visit_date: {
      type: "date",
    },
    complaint: {
      type: "text",
    },
    diagnosis: {
      type: "text",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    patient: {
      type: "many-to-one",
      target: "Patient",
      joinColumn: true,
      eager: true,
    },
  },
});
