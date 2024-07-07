const pool = require("../config/database");

const executeQuery = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { executeQuery };
