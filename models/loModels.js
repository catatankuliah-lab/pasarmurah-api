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

  getJumlahLOBulanan: async (bulan) => {
    try {
      const tahunSekarang = new Date().getFullYear(); // Ambil tahun sekarang
      const bulanFormatted = bulan.toString().padStart(2, "0"); // Format jadi '01', '02', dst.

      const [results] = await sequelize.query(
        `
        SELECT COUNT(*) as jumlahLO
        FROM lo
        WHERE tanggal_po LIKE ?
      `,
        { replacements: [`${tahunSekarang}-${bulanFormatted}%`] }
      );

      return results[0].jumlahLO || 0;
    } catch (error) {
      console.error("Error in getJumlahPOBulanan:", error);
      throw new Error("Gagal mengambil jumlah PO bulanan");
    }
  },

  // Get LO by ID
  getLOById: async (id_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.id_lo,
        lo.id_alokasi,
        lo.id_po,
        lo.id_kantor,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat AS lo_titik_muat,
        lo.jenis_mobil,
        lo.nopol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo,
        lo.status_lo,
        alokasi.keterangan_alokasi,
        po.tanggal_po,
        po.customer,
        po.titik_muat AS po_titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        po ON lo.id_po = po.id_po
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
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
  getLOByIdKantor: async (id_kantor) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.*,
        kantor.nama_kantor,
        kantor.kode_kantor
        FROM 
        lo
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
      WHERE 
        lo.id_kantor = ?
    `,
      { replacements: [id_kantor] }
    );
    return results;
  },

  // Add LO
  addLO: async (loData) => {
    const {
      id_alokasi,
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
    } = loData;
    const [result] = await sequelize.query(
      `
      INSERT INTO lo (
        id_alokasi, id_kantor, nomor_lo, tanggal_lo, titik_muat,
        jenis_mobil, nopol_mobil, nama_driver, telpon_driver, file_lo, status_lo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_alokasi,
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
        ],
      }
    );
    return { id_lo: result.insertId, ...loData };
  },

  // Update LO
  updateLO: async (id_lo, loData) => {
    const {
      id_alokasi,
      id_po,
      id_kantor,
      nomor_lo,
      tanggal_lo,
      titik_muat,
      jenis_mobil,
      nopol_mobil,
      nama_driver,
      telpon_driver,
      file_lo,
    } = loData;
    const [result] = await sequelize.query(
      `
      UPDATE lo
      SET 
        id_alokasi = ?, id_po = ?, id_kantor = ?, nomor_lo = ?, tanggal_lo = ?, titik_muat = ?,
        jenis_mobil = ?, nopol_mobil = ?, nama_driver = ?, telpon_driver = ?, file_lo = ?
      WHERE 
        id_lo = ?
    `,
      {
        replacements: [
          id_alokasi,
          id_po,
          id_kantor,
          nomor_lo,
          tanggal_lo,
          titik_muat,
          jenis_mobil,
          nopol_mobil,
          nama_driver,
          telpon_driver,
          file_lo,
          id_lo,
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

};

export default LO;