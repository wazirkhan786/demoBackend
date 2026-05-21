const { Pool } = require("pg");
const { databaseUrl } = require("./env");

const isLocalDb =
  databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isLocalDb ? false : { rejectUnauthorized: false },
});

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

module.exports = { pool, ensureSubmissionsTable };
