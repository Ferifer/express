module.exports = {
  type: "postgres", //mysql, postgres,sqlserver
  host: "localhost", //localhost, 132.312.321.13
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "express-db",
  synchronize: true, // true hanya boleh ketika development
  logging: true, //log query
  entities: ["entity/*.js"],
};
