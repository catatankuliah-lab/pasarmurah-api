import sequelize from "../config/config.js";

const Driver = {
  // Mendapatkan semua driver
  getAllDriver: async (page = 1, per_page = 10) => {
    try {
      const offset = (page - 1) * per_page;
      const query = `
        SELECT
          id_driver,
          id_user,
          nik,
          nama_driver,
          telpon_driver,
          nama_kontak_darurat_driver,
          telpon_kontak_darurat_driver,
          masa_berlaku_sim,
          foto_ktp_driver,
          foto_sim_driver,
          status_driver
        FROM
            driver
        LIMIT :per_page OFFSET :offset;
      `;
      const data = await sequelize.query(query, {
        replacements: {
          per_page: parseInt(per_page),
          offset: parseInt(offset)
        },
        type: sequelize.QueryTypes.SELECT,
      });

      const countQuery = `
        SELECT COUNT(*) AS total
        FROM driver
      `;

      const [countResult] = await sequelize.query(countQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      console.log('Count Query Result:', countResult);

      return {
        data,
        total: countResult.total,
        page,
        per_page,
      };
    } catch (error) {
      throw new Error("Error fetching paginated data: " + error.message);
    }
  },

  getAllDrivers: async () => {
    const [results] = await sequelize.query(`
      SELECT * FROM driver
    `);
    return results;
  },

  // Mendapatkan driver berdasarkan ID
  getDriverById: async (id_driver) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_driver,
        id_user,
        nik,
        nama_driver,
        telpon_driver,
        nama_kontak_darurat_driver,
        telpon_kontak_darurat_driver,
        masa_berlaku_sim,
        foto_ktp_driver,
        foto_sim_driver,
        status_driver
      FROM driver
      WHERE id_driver = ?
    `,
      { replacements: [id_driver] }
    );
    return results[0];
  },

  // Menambahkan driver baru
  addDriver: async (driverData) => {
    const {
      id_user,
      nik,
      nama_driver,
      telpon_driver,
      nama_kontak_darurat_driver,
      telpon_kontak_darurat_driver,
      masa_berlaku_sim,
      foto_ktp_driver,
      foto_sim_driver,
      status_driver,
    } = driverData;
    const [result] = await sequelize.query(
      `
      INSERT INTO driver (id_user, nik, nama_driver, telpon_driver, nama_kontak_darurat_driver, telpon_kontak_darurat_driver, masa_berlaku_sim, foto_ktp_driver, foto_sim_driver, status_driver)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_user,
          nik,
          nama_driver,
          telpon_driver,
          nama_kontak_darurat_driver,
          telpon_kontak_darurat_driver,
          masa_berlaku_sim,
          foto_ktp_driver,
          foto_sim_driver,
          status_driver,
        ],
      }
    );
    return { id_driver: result.insertId, ...driverData };
  },

  // Memperbarui data driver
  updateDriver: async (id_driver, driverData) => {
    const {
      id_user,
      nik,
      nama_driver,
      telpon_driver,
      nama_kontak_darurat_driver,
      telpon_kontak_darurat_driver,
      masa_berlaku_sim,
      foto_ktp_driver,
      foto_sim_driver,
      status_driver,
    } = driverData;

    const [result] = await sequelize.query(
      `
      UPDATE driver
      SET 
        id_user = ?,
        nik = ?,
        nama_driver = ?,
        telpon_driver = ?,
        nama_kontak_darurat_driver = ?,
        telpon_kontak_darurat_driver = ?,
        masa_berlaku_sim = ?,
        foto_ktp_driver = ?,
        foto_sim_driver = ?,
        status_driver = ?
      WHERE 
        id_driver = ?
    `,
      {
        replacements: [
          id_user,
          nik,
          nama_driver,
          telpon_driver,
          nama_kontak_darurat_driver,
          telpon_kontak_darurat_driver,
          masa_berlaku_sim,
          foto_ktp_driver,
          foto_sim_driver,
          status_driver,
          id_driver
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Menghapus driver
  deleteDriver: async (id_driver) => {
    const [result] = await sequelize.query(
      `DELETE FROM driver WHERE id_driver = ?`,
      { replacements: [id_driver] }
    );
    return result.affectedRows > 0;
  },

  getDriverAvailability: async () => {
    const [ available ] = await sequelize.query("SELECT COUNT(*) AS available FROM driver WHERE status_driver = 'TERSEDIA';");
    console.log(available);
    const [ unavailable ] = await sequelize.query("SELECT COUNT(*) AS unavailable FROM driver WHERE status_driver = 'TIDAK TERSEDIA';");
    console.log(unavailable);

    return { available, unavailable };
  },

  uploadFileDriver: async (id_driver, { file_driver }) => {
    const [results] = await sequelize.query(

      `
    UPDATE driver
    SET foto_ktp_driver = ?
    WHERE id_driver = ?
    `,
    
      {
        replacements: [file_driver, id_driver],
      }
    );
    console.log(results);

    // Validasi hasil
    if (results.affectedRows === 0) {
      throw new Error("No rows updated. ID may not exist.");
    }

    return results;
  }
};

export default Driver;