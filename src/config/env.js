require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://owner@localhost:5432/backend",
};
