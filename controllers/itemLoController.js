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

export const getRekapKantor = async (req, res) => {
  const { id_kantor, nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo } = req.query;
  try {
    const { data } = await ItemLO.getRekapKantor(
      { id_kantor, nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo }
    );

    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addMuatan = async (req, res) => {
  const { id_lo, id_kabupaten_kota, titik_bongkar, beras, minyak, terigu, gula } = req.body;

  try {
    const id_item_lo = await ItemLO.addMuatan(id_lo, id_kabupaten_kota, titik_bongkar, beras, minyak, terigu, gula);
    console.log(id_item_lo);
    res.status(201).json({
      status: "success",
      data: id_item_lo,
      message: "Item LO created successfully."
    });
  } catch (error) {
    console.error("Error creating Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const getMuatanByLO = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const muatan = await ItemLO.getMuatanByLO(id_lo);
    if (muatan.length > 0) {
      res.status(200).json({
        status: "success",
        data: muatan,
        message: "Titik Bongkar records fetched successfully by PO ID."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Titik Bongkar records found for the given PO ID."
      });
    }
  } catch (error) {
    console.error("Error fetching Titik Bongkar by PO ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const deleteMuatan = async (req, res) => {
  const { id_item_lo } = req.params;

  try {
    const deleted = await ItemLO.deleteMuatan(id_item_lo);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Titik Bongkar deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Titik Bongkar not found."
      });
    }
  } catch (error) {
    console.error("Error deleting Titik Bongkar:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};