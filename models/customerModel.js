import sequelize from "../config/config.js";

const Customer = {
  // Mendapatkan semua customer
  getAllCustomers: async () => {
    const [results] = await sequelize.query(`
      SELECT * FROM customer
    `);
    return results;
  },

  getCustomerById: async (id_customer) => {
    const [results] = await sequelize.query(
      `
      SELECT * FROM customer
      WHERE id_customer = ?
      `,
      {
        replacements: [id_customer],
      }
    );
    return results[0];
  },

  addCustomer: async (
    nama_customer,
    alamat_customer,
    penanggung_jawab_customer,
    nomor_penanggung_jawab_customer,
    jumlah_order
  ) => {
    const result = await sequelize.query(
      `
      INSERT INTO customer (
        nama_customer, alamat_customer, penanggung_jawab_customer, nomor_penanggung_jawab_customer, jumlah_order
      ) VALUES (?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          nama_customer,
          alamat_customer,
          penanggung_jawab_customer,
          nomor_penanggung_jawab_customer,
          jumlah_order
        ],
      }
    );
    return result[0];
  },

  updateCustomer: async (id_customer, customerData) => {
    const { nama_customer, alamat_customer, penanggung_jawab_customer, nomor_penanggung_jawab_customer, jumlah_order } = customerData;
    const [result] = await sequelize.query(
      `
      UPDATE customer
      SET 
        nama_customer = ?,
        alamat_customer = ?,
        penanggung_jawab_customer = ?,
        nomor_penanggung_jawab_customer = ?,
        jumlah_order = ?
      WHERE 
        id_customer = ?
    `,
      {
        replacements: [
          nama_customer,
          alamat_customer,
          penanggung_jawab_customer,
          nomor_penanggung_jawab_customer,
          jumlah_order,
          id_customer
        ],
      }
    );
    return result.affectedRows > 0;
  },
};

export default Customer;