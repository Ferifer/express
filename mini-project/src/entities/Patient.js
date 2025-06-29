const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Patient",
  tableName: "patients",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    age: {
      type: "int",
    },
    gender: {
      type: "varchar",
    },
    address: {
      type: "text",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    visits: {
      type: "one-to-many",
      target: "Visit",
      inverseSide: "patient",
      cascade: true,
    },
  },
});
