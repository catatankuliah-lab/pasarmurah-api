import Kantor from "../models/kantorModel.js";

export const getAllKantor = async (req, res) => {
  try {
    const kantor = await Kantor.getAllKantor();
    res.status(200).json({
      status: "success",
      data: kantor,
      message: "Kantor fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching Kantor:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};