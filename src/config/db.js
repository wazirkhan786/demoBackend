const { Pool } = require("pg");
const { databaseUrl } = require("./env");

const pool = new Pool({ connectionString: databaseUrl });

const SUBMISSIONS_TABLE_SQL = `
  CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    params JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

const submissionsTableExists = async () => {
  const { rows } = await pool.query(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'submissions'
    )`
  );

  return rows[0].exists;
};

const ensureSubmissionsTable = async () => {
  const exists = await submissionsTableExists();

  if (!exists) {
    await pool.query(SUBMISSIONS_TABLE_SQL);
    console.log("Submissions table created");
  }
};

const connectDB = async () => {
  await pool.query("SELECT 1");
  console.log("PostgreSQL connected");
};

module.exports = { pool, connectDB, ensureSubmissionsTable };
