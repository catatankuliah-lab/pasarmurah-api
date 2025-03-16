import sequelize from "../config/config.js";

const User = {
  // Mendapatkan semua user dengan join tabel role
  getAllUsers: async () => {
    const [results] = await sequelize.query(`
      SELECT
        user.*,
        role.nama_role
      FROM user
      LEFT JOIN
        role ON user.id_role = role.id_role
    `);
    return results;
  },

  getUserById: async (id_user) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        user.*,
        role.nama_role
      FROM 
        user
      LEFT JOIN 
        role ON user.id_role = role.id_role
      WHERE 
        user.id_user = ?
      `,
      {
        replacements: [id_user],
      }
    );
    return results[0];
  },

  addUser: async (
    id_role,
    id_kantor,
    username,
    password,
    status_user
  ) => {
    const result = await sequelize.query(
      `
      INSERT INTO user (
        id_role, id_kantor, username, password, status_user
      ) VALUES (?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_role,
          id_kantor,
          username,
          password,
          status_user
        ],
      }
    );
    return result[0];
  }
};

export default User;
