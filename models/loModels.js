import sequelize from "../config/config.js";

const LO = {
  // Get all LOs
  getAllLO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        lo.*,
        kantor.nama_kantor,
        kantor.kode_kantor
      FROM 
        lo
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
    `);
    return results;
  },

  getJumlahLOKantor: async (id_kantor) => {
    try {
      const [results] = await sequelize.query(
        `
        SELECT COUNT(*) as jumlahLO
        FROM lo
        WHERE id_kantor = :id_kantor
      `,
        { replacements: { id_kantor } }
      );

      return results[0].jumlahLO || 0;
    } catch (error) {
      console.error("Error in getJumlahLOBulanan:", error);
      throw new Error("Gagal mengambil jumlah LO bulanan");
    }
  },

  // Get LO by ID
  getLOById: async (id_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.*
      FROM 
        lo
      WHERE 
        lo.id_lo = ?
    `,
      { replacements: [id_lo] }
    );
    return results[0]; // Return a single object
  },

  // Get LO by ID PO
  getLOByIdPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.*,
        alokasi.keterangan_alokasi,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
      WHERE 
        lo.id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results;
  },

  // Get LO by ID Kantor
  getLOByIdKantor: async (filters = {}) => {
    try {
      let whereClause = "WHERE lo.id_kantor = :id_kantor";
      let replacements = { id_kantor: filters.id_kantor };

      if (filters.nomor_lo) {
        whereClause += " AND lo.nomor_lo LIKE :nomor_lo";
        replacements.nomor_lo = `%${filters.nomor_lo}%`;
      }
      if (filters.titik_muat) {
        whereClause += " AND lo.titik_muat LIKE :titik_muat";
        replacements.titik_muat = `%${filters.titik_muat}%`;
      }

      if (filters.nopol_mobil) {
        whereClause += " AND lo.nopol_mobil LIKE :nopol_mobil";
        replacements.nopol_mobil = `%${filters.nopol_mobil}%`;
      }

      if (filters.nama_driver) {
        whereClause += " AND lo.nama_driver LIKE :nama_driver";
        replacements.nama_driver = `%${filters.nama_driver}%`;
      }

      if (filters.startDate && filters.endDate) {
        whereClause += " AND lo.tanggal_lo BETWEEN :startDate AND :endDate";
        replacements.startDate = filters.startDate;
        replacements.endDate = filters.endDate;
      } else if (filters.startDate) {
        whereClause += " AND lo.tanggal_lo >= :startDate";
        replacements.startDate = filters.startDate;
      } else if (filters.endDate) {
        whereClause += " AND lo.tanggal_lo <= :endDate";
        replacements.endDate = filters.endDate;
      }

      if (filters.status_lo) {
        whereClause += " AND lo.status_lo = :status_lo";
        replacements.status_lo = filters.status_lo;
      }

      const query = `
            SELECT 
                lo.*,
                kantor.nama_kantor,
                kantor.kode_kantor
            FROM lo
            LEFT JOIN kantor ON lo.id_kantor = kantor.id_kantor
            ${whereClause}
        `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      return { data };
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  },

  // Add LO
  addLO: async (id_kantor, nomor_lo, tanggal_lo, titik_muat, jenis_mobil, nopol_mobil, nama_driver, telpon_driver, file_lo, status_lo) => {

    const result = await sequelize.query(
      `
      INSERT INTO lo (
        id_kantor, nomor_lo, tanggal_lo, titik_muat,
        jenis_mobil, nopol_mobil, nama_driver, telpon_driver, file_lo, status_lo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_kantor,
          nomor_lo,
          tanggal_lo,
          titik_muat,
          jenis_mobil,
          nopol_mobil,
          nama_driver,
          telpon_driver,
          file_lo,
          status_lo
        ],
      }
    );
    return result[0];
  },

  // Update LO
  updateLO: async (id_lo, loData) => {
    const {
      id_kantor,
      nomor_lo,
      tanggal_lo,
      titik_muat,
      jenis_mobil,
      nopol_mobil,
      nama_driver,
      telpon_driver,
      file_lo,
      status_lo
    } = loData;
    const [result] = await sequelize.query(
      `
      UPDATE lo
      SET 
        id_kantor = ?, nomor_lo = ?, tanggal_lo = ?, titik_muat = ?,
        jenis_mobil = ?, nopol_mobil = ?, nama_driver = ?, telpon_driver = ?, file_lo = ?, status_lo = ?
      WHERE 
        id_lo = ?
    `,
      {
        replacements: [
          id_kantor,
          nomor_lo,
          tanggal_lo,
          titik_muat,
          jenis_mobil,
          nopol_mobil,
          nama_driver,
          telpon_driver,
          file_lo,
          status_lo,
          id_lo
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete LO
  deleteLO: async (id_lo) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM lo
      WHERE id_lo = ?
    `,
      { replacements: [id_lo] }
    );
    return result.affectedRows > 0;
  },

  getFilteredLO: async (filters) => {
    try {
      let query = `SELECT 
          kantor.id_kantor,
          kantor.nama_kantor,
          lo.id_lo,
          lo.id_alokasi,
          lo.id_po,
          lo.id_kantor,
          lo.nomor_lo,
          lo.tanggal_lo,
          lo.titik_muat,
          lo.jenis_mobil,
          lo.nopol_mobil,
          lo.nama_driver,
          lo.telpon_driver,
          lo.file_lo,
          lo.status_lo,
          JSON_OBJECT(
              'ayam', SUM(CASE WHEN item_lo.jenis_muatan = 'AYAM' THEN item_lo.jumlah_muatan_ayam ELSE 0 END),
              'telur', SUM(CASE WHEN item_lo.jenis_muatan = 'TELUR' THEN item_lo.jumlah_muatan_telur ELSE 0 END)
          ) AS jenis_muatan_json
          FROM
              lo
          JOIN 
              item_lo ON lo.id_lo = item_lo.id_lo
          JOIN 
              kantor ON lo.id_kantor = kantor.id_kantor
          WHERE 1 = 1`;
      const params = [];

      // Filter berdasarkan id_alokasi jika ada
      if (filters.id_alokasi) {
        query += " AND lo.id_alokasi = ?";
        params.push(filters.id_alokasi);
      }

      // Filter berdasarkan id_kantor jika ada dan valid
      if (filters.id_kantor && filters.id_kantor !== null && filters.id_kantor !== 'null') {
        query += " AND lo.id_kantor = ?";
        params.push(filters.id_kantor);
      }

      if (filters.tanggal_lo.$gte != "Invalid Date" || filters.tanggal_lo.$lte != "Invalid Date") {
        if (filters.tanggal_lo.$gte && filters.tanggal_lo.$lte) {
          query += " AND lo.tanggal_lo BETWEEN ? AND ?";
          params.push(filters.tanggal_lo.$gte);
          params.push(filters.tanggal_lo.$lte);
        } else if (filters.tanggal_lo.$gte) {
          query += " AND lo.tanggal_lo >= ?";
          params.push(filters.tanggal_lo.$gte);
        } else if (filters.tanggal_lo.$lte) {
          query += " AND lo.tanggal_lo <= ?";
          params.push(filters.tanggal_lo.$lte);
        }
      }

      query += `GROUP BY 
        kantor.id_kantor,
        kantor.nama_kantor,
        lo.id_lo,
        lo.id_alokasi,
        lo.id_po,
        lo.id_kantor,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nopol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo;
      `;


      const [loList] = await sequelize.query(query, {
        replacements: params,
        type: sequelize.QueryTypes.SELECT,
      });
      return loList;
    } catch (error) {
      console.error("Error fetching filtered loading orders:", error);
      throw error;
    }
  },

  uploadLO: async (id_lo, fileLOnya) => {
    const [result] = await sequelize.query(
      `
      UPDATE lo
      SET file_lo = ?
      WHERE id_lo = ?
    `,
      {
        replacements: [fileLOnya, id_lo],
      }
    );
    return result.affectedRows > 0;
  }

};

export default LO;