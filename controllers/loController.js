import LO from "../models/loModels.js";

// Get all LOs
export const getAllLO = async (req, res) => {
  try {
    const los = await LO.getAllLO();
    res.status(200).json({
      status: "success",
      data: los,
      message: "LOs fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching LOs:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJumlahLOBulanan = async (req, res) => {
  try {
    const { bulan } = req.params;

    // Validasi bulan (1-12)
    if (!bulan || isNaN(bulan) || bulan < 1 || bulan > 12) {
      return res.status(400).json({ message: "Bulan tidak valid" });
    }

    // Ambil jumlah PO berdasarkan LIKE
    const jumlahLO = await LO.getJumlahLOBulanan(bulan);

    return res.status(200).json({ bulan, jumlahLO });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Get LO by ID
export const getLOById = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const lo = await LO.getLOById(id_lo);
    if (lo) {
      res.status(200).json({
        status: "success",
        data: lo,
        message: "LO fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "LO not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching LO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Get LO by ID PO
export const getLOByIdPO = async (req, res) => {
  const { id_po } = req.params;

  try {
    const los = await LO.getLOByIdPO(id_po);
    if (los.length > 0) {
      res.status(200).json({
        status: "success",
        data: los,
        message: "LOs fetched successfully by PO ID.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No LOs found for the given PO ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching LOs by PO ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Get LO by ID Kantor
export const getLOByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const los = await LO.getLOByIdKantor(id_kantor);
    if (los.length > 0) {
      res.status(200).json({
        status: "success",
        data: los,
        message: "LOs fetched successfully by Kantor ID.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No LOs found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching LOs by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Add a new LO
export const addLO = async (req, res) => {
  const loData = req.body;

  try {
    const newLO = await LO.addLO(loData);
    res.status(201).json({
      status: "success",
      data: newLO,
      message: "LO created successfully.",
    });
  } catch (error) {
    console.error("Error creating LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Update LO
export const updateLO = async (req, res) => {
  const { id_lo } = req.params;
  const loData = req.body;

  try {
    const updatedLO = await LO.updateLO(id_lo, loData);
    if (updatedLO) {
      res.status(200).json({
        status: "success",
        data: updatedLO,
        message: "LO updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "LO not found.",
      });
    }
  } catch (error) {
    console.error("Error updating LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Delete LO
export const deleteLO = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const deleted = await LO.deleteLO(id_lo);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "LO deleted successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "LO not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getFilteredLO = async (req, res) => {
  const { id_alokasi, id_kantor, tanggal_awal, tanggal_akhir } = req.query;

  try {
    const filters = {};

    if (id_alokasi) {
      filters.id_alokasi = id_alokasi;
    }

    if (id_kantor) {
      filters.id_kantor = id_kantor;
    }

    if (tanggal_awal && tanggal_akhir) {
      filters.tanggal_lo = {
        $gte: new Date(tanggal_awal),
        $lte: new Date(tanggal_akhir),
      };
    }

    const lolist = await LO.getFilteredLO(filters);

    if (lolist) {
      res.status(200).json({
        status: "success",
        data: lolist,
        message: "Filtered purchase orders fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No purchase orders found for the given filters.",
      });
    }
  } catch (error) {
    console.error("Error fetching filtered purchase orders:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
