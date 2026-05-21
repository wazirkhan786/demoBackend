const { pool, ensureSubmissionsTable } = require("../config/db");

/* CREATE */
const create = async (params) => {
  await ensureSubmissionsTable();

  const { rows } = await pool.query(
    "INSERT INTO submissions (params) VALUES ($1) RETURNING id, params, created_at",
    [params]
  );

  const row = rows[0];

  return {
    id: row.id,
    params: row.params,
    createdAt: row.created_at,
  };
};

/* READ ALL */
const findAll = async () => {
  const { rows } = await pool.query(
    "SELECT id, params, created_at FROM submissions ORDER BY created_at DESC"
  );

  return rows.map((row) => ({
    id: row.id,
    params: row.params,
    createdAt: row.created_at,
  }));
};

/* READ BY ID */
const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, params, created_at FROM submissions WHERE id = $1",
    [id]
  );

  if (rows.length === 0) return null;

  const row = rows[0];

  return {
    id: row.id,
    params: row.params,
    createdAt: row.created_at,
  };
};

/* UPDATE */
const update = async (id, params) => {
  const { rows } = await pool.query(
    "UPDATE submissions SET params = $1 WHERE id = $2 RETURNING id, params, created_at",
    [params, id]
  );

  if (rows.length === 0) return null;

  const row = rows[0];

  return {
    id: row.id,
    params: row.params,
    createdAt: row.created_at,
  };
};

/* DELETE */
const remove = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM submissions WHERE id = $1 RETURNING id",
    [id]
  );

  if (rows.length === 0) return null;

  return {
    deleted: true,
    id: rows[0].id,
  };
};
const removeAll = async () => {
  const { rowCount } = await pool.query("DELETE FROM submissions");

  return {
    deleted: true,
    count: rowCount,
  };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  removeAll,
};
