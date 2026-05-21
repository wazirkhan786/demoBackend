require("dotenv").config();

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

if (isProduction && !process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is missing. In Railway: add PostgreSQL → Variables → reference DATABASE_URL on this service."
  );
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv,
  isProduction,
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://owner@localhost:5432/backend",
};
