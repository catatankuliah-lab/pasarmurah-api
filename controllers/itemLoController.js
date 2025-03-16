import ItemLO from "../models/itemLoModels.js";
export const getRekapAll = async (req, res) => {
  const { nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo } = req.query;
  try {
    const { data } = await ItemLO.getRekapAll(
      { nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo }
    );

    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
