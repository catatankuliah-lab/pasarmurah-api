import sequelize from "../config/config.js";

const Kantor = {
  // Mendapatkan semua kabupaten/kota
  getAllKantor: async () => {
    const [results] = await sequelize.query(`
      SELECT 
      kantor.*
      FROM 
        kantor
    `);
    return results;
  },

};

export default Kantor;
