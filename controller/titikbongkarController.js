import TitikBongkar from "../models/titikbongkarModel.js"; // Ensure the model is created

// Get all Titik Bongkar
export const getAllTitikBongkar = async (req, res) => {
  try {
    const titikBongkars = await TitikBongkar.getAllTitikBongkar();
    res.status(200).json({
      status: "success",
      data: titikBongkars,
      message: "Titik Bongkar records fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching Titik Bongkar records:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Titik Bongkar by ID
export const getTitikBongkarById = async (req, res) => {
  const { id_titik_bongkar } = req.params;

  try {
    const titikBongkar = await TitikBongkar.getTitikBongkarById(id_titik_bongkar);
    if (titikBongkar) {
      res.status(200).json({
        status: "success",
        data: titikBongkar,
        message: "Titik Bongkar fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Titik Bongkar not found."
      });
    }
  } catch (error) {
    console.error("Error fetching Titik Bongkar by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Titik Bongkar by PO ID
export const getTitikBongkarByPO = async (req, res) => {
  const { id_po } = req.params;

  try {
    const titikBongkars = await TitikBongkar.getTitikBongkarByPO(id_po);
    if (titikBongkars.length > 0) {
      res.status(200).json({
        status: "success",
        data: titikBongkars,
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

// Add a new Titik Bongkar
export const addTitikBongkar = async (req, res) => {
  const titikBongkarData = req.body;

  try {
    const newTitikBongkar = await TitikBongkar.addTitikBongkar(titikBongkarData);
    res.status(201).json({
      status: "success",
      data: newTitikBongkar,
      message: "Titik Bongkar created successfully."
    });
  } catch (error) {
    console.error("Error creating Titik Bongkar:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Update Titik Bongkar
export const updateTitikBongkar = async (req, res) => {
  const { id_titik_bongkar } = req.params;
  const titikBongkarData = req.body;

  try {
    const updatedTitikBongkar = await TitikBongkar.updateTitikBongkar(id_titik_bongkar, titikBongkarData);
    if (updatedTitikBongkar) {
      res.status(200).json({
        status: "success",
        data: updatedTitikBongkar,
        message: "Titik Bongkar updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Titik Bongkar not found."
      });
    }
  } catch (error) {
    console.error("Error updating Titik Bongkar:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Delete Titik Bongkar
export const deleteTitikBongkar = async (req, res) => {
  const { id_titik_bongkar } = req.params;

  try {
    const deleted = await TitikBongkar.deleteTitikBongkar(id_titik_bongkar);
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
