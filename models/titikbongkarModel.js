import sequelize from "../config/config.js";

const TitikBongkar = {
  // Mendapatkan semua titik bongkar
  getAllTitikBongkar: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        id_titik_bongkar,
        id_po,
        id_kabupaten_kota,
        alamat_titik_bongkar,
        jam_bongkar
      FROM titik_bongkar
    `);
    return results;
  },

  // Mendapatkan titik bongkar berdasarkan ID
  getTitikBongkarById: async (id_titik_bongkar) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_titik_bongkar,
        id_po,
        id_kabupaten_kota,
        alamat_titik_bongkar,
        jam_bongkar
      FROM titik_bongkar
      WHERE id_titik_bongkar = ?
    `,
      { replacements: [id_titik_bongkar] }
    );
    return results[0];
  },

  // Mendapatkan titik bongkar berdasarkan ID PO
  getTitikBongkarByPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_titik_bongkar,
        id_po,
        id_kabupaten_kota,
        alamat_titik_bongkar,
        jam_bongkar
      FROM titik_bongkar
      WHERE id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results;
  },

  // Menambahkan titik bongkar baru
  addTitikBongkar: async (titikBongkarData) => {
    const { id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar } = titikBongkarData;
    const [result] = await sequelize.query(
      `
      INSERT INTO titik_bongkar (id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar)
      VALUES (?, ?, ?, ?)
    `,
      {
        replacements: [id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar],
      }
    );
    return { id_titik_bongkar: result.insertId, ...titikBongkarData };
  },

  // Memperbarui titik bongkar
  updateTitikBongkar: async (id_titik_bongkar, titikBongkarData) => {
    const { id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar } = titikBongkarData;
    const [result] = await sequelize.query(
      `
      UPDATE titik_bongkar
      SET id_po = ?, id_kabupaten_kota = ?, alamat_titik_bongkar = ?, jam_bongkar = ?
      WHERE id_titik_bongkar = ?
    `,
      {
        replacements: [id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, id_titik_bongkar],
      }
    );
    return result.affectedRows > 0;
  },

  // Menghapus titik bongkar
  deleteTitikBongkar: async (id_titik_bongkar) => {
    const [result] = await sequelize.query(
      `DELETE FROM titik_bongkar WHERE id_titik_bongkar = ?`,
      { replacements: [id_titik_bongkar] }
    );
    return result.affectedRows > 0;
  },
};

export default TitikBongkar;
