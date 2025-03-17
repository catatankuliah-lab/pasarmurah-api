import sequelize from "../config/config.js";
import { deleteMuatan, getMuatanByLO } from "../controllers/itemLoController.js";

const ItemLO = {
  getRekapAll: async (filters = {}) => {
    try {
      let whereClause = "WHERE 1=1";
      let replacements = {};

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

      if (filters.titik_bongkar) {
        whereClause += " AND item_lo.titik_bongkar LIKE :titik_bongkar";
        replacements.titik_bongkar = `%${filters.titik_bongkar}%`;
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
        lo.id_lo,
        lo.nomor_lo,
        lo.id_kantor,
        kantor.nama_kantor,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nopol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.status_lo,
        item_lo.id_item_lo,
        kabupaten_kota.nama_kabupaten_kota,
        item_lo.titik_bongkar,
        item_lo.beras,
        item_lo.minyak,
        item_lo.terigu,
        item_lo.gula
      FROM item_lo
      JOIN lo ON item_lo.id_lo = lo.id_lo
      JOIN kabupaten_kota ON item_lo.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
      JOIN kantor ON lo.id_kantor = kantor.id_kantor
      ${whereClause}
    `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      return {
        data
      };
    } catch (error) {
      throw new Error("Error fetching paginated data: " + error.message);
    }
  },

  getRekapKantor: async (filters = {}) => {
    try {

      let whereClause = "WHERE 1=1";
      let replacements = {};

      if (filters.id_kantor) {
        whereClause += " AND lo.id_kantor = :id_kantor";
        replacements.id_kantor = `${filters.id_kantor}`;
      }

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

      if (filters.titik_bongkar) {
        whereClause += " AND item_lo.titik_bongkar LIKE :titik_bongkar";
        replacements.titik_bongkar = `%${filters.titik_bongkar}%`;
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
        lo.id_lo,
        lo.nomor_lo,
        lo.id_kantor,
        kantor.nama_kantor,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nopol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.status_lo,
        item_lo.id_item_lo,
        kabupaten_kota.nama_kabupaten_kota,
        item_lo.titik_bongkar,
        item_lo.beras,
        item_lo.minyak,
        item_lo.terigu,
        item_lo.gula
      FROM item_lo
      JOIN lo ON item_lo.id_lo = lo.id_lo
      JOIN kabupaten_kota ON item_lo.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
      JOIN kantor ON lo.id_kantor = kantor.id_kantor
      ${whereClause}
    `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      return {
        data
      };
    } catch (error) {
      throw new Error("Error fetching paginated data: " + error.message);
    }
  },


  addMuatan: async (id_lo, id_kabupaten_kota, titik_bongkar, beras, minyak, terigu, gula) => {
    // console.log("Received data:", titikBongkarData);

    const result = await sequelize.query(
      `
      INSERT INTO item_lo (id_lo, id_kabupaten_kota, titik_bongkar, beras, minyak, terigu, gula)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [id_lo, id_kabupaten_kota, titik_bongkar, beras, minyak, terigu, gula],
      }
    );
    return result[0];
  },

  getMuatanByLO: async (id_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
      item_lo.id_item_lo,
      item_lo.id_lo,
      item_lo.id_kabupaten_kota,
      item_lo.titik_bongkar,
      item_lo.beras,
      item_lo.minyak,
      item_lo.terigu,
      item_lo.gula,
      lo.nomor_lo,
      lo.tanggal_lo,
      lo.titik_muat,
      lo.nama_driver,
      lo.nopol_mobil,
      lo.telpon_driver,
      kabupaten_kota.nama_kabupaten_kota
    FROM item_lo
    JOIN lo ON item_lo.id_lo = lo.id_lo
    JOIN kabupaten_kota ON item_lo.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
    WHERE item_lo.id_lo = :id_lo;
    `,
      { replacements: { id_lo } }
    );
    return results;
  },

  deleteMuatan: async (id_item_lo) => {
    const [result] = await sequelize.query(
      `DELETE FROM item_lo WHERE id_item_lo = ?`,
      { replacements: [id_item_lo] }
    );
    return result.affectedRows > 0;
  },
};


export default ItemLO;

