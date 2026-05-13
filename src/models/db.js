const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL || process.env.SCALINGO_POSTGRESQL_URL;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

const query = (text, params) => pool.query(text, params);

const initDatabase = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(sql);
  } catch (err) {
    console.error("Erreur lors de l'initialisation de la base de données :", err);
    throw err;
  }
};

module.exports = {
  query,
  initDatabase
};