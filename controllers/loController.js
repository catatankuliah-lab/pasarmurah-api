import LO from "../models/loModels.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload };

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

export const getJumlahLOKantor = async (req, res) => {
  try {
    const { id_kantor } = req.params;

    // Ambil jumlah PO berdasarkan LIKE
    const jumlahLO = await LO.getJumlahLOKantor(id_kantor);

    return res.status(200).json({ id_kantor, jumlahLO });
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
  const { id_kantor, nomor_lo, tanggal_lo, titik_muat, jenis_mobil, nopol_mobil, nama_driver, telpon_driver, file_lo, status_lo } = req.body;

  try {
    const id_lo = await LO.addLO(id_kantor, nomor_lo, tanggal_lo, titik_muat, jenis_mobil, nopol_mobil, nama_driver, telpon_driver, file_lo, status_lo);
    res.status(201).json({
      status: "success",
      data: id_lo,
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

export const getRekapAll = async (req, res) => {
  const { page = 1, limit = 10, nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo } = req.query;
  try {
    const { data, total } = await LO.getRekapAll(
      parseInt(page),
      parseInt(limit),
      { nomor_lo, titik_muat, nama_kabupaten_kota, nopol_mobil, nama_driver, titik_bongkar, startDate, endDate, status_lo }
    );

    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const uploadLO = async (req, res) => {
  upload.single("file_lo")(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const nomorLo = req.body.nomor_lo;
    const idKantor = req.body.id_kantor;
    if (!nomorLo) {
      return res.status(400).json({ error: "Nomor LO tidak ditemukan" });
    }

    // Tentukan lokasi penyimpanan
    const uploadPath = "uploads/" + idKantor + "/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file baru
    const newFileName = `${nomorLo}.pdf`;
    const filePath = path.join(uploadPath, newFileName);

    // Simpan file dari buffer ke disk dengan nama yang diinginkan
    fs.writeFile(filePath, req.file.buffer, (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan file" });
      }

      console.log("Upload sukses:", newFileName);
      res.json({
        message: "Upload berhasil",
        fileName: newFileName,
      });
    });
  });
};