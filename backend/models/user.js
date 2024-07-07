const { executeQuery } = require("./db");

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM staff WHERE email = ?";
  return await executeQuery(sql, [email]);
};

const createUser = async (user) => {
  const sql = `
    INSERT INTO staff (email, password)
    VALUES (?, ?)`;
  const params = [user.email, user.password];
  return await executeQuery(sql, params);
};

module.exports = {
  findUserByEmail,
  createUser,
};
