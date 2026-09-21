const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tours = await Tour.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tours",
      error: error.message,
    });
  }
};

const getTourById = async (req, res) => {
  const { tourId } = req.params;

  try {
    const user_id = req.user._id;

    const tour = await Tour.findOne({
      _id: tourId,
      user_id,
    });

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found",
      });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tour",
      error: error.message,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const user_id = req.user._id;

    const newTour = await Tour.create({
      ...req.body,
      user_id,
    });

    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create tour",
      error: error.message,
    });
  }
};

const updateTour = async (req, res) => {
  const { tourId } = req.params;

  try {
    const user_id = req.user._id;

    const updatedTour = await Tour.findOneAndUpdate(
      {
        _id: tourId,
        user_id,
      },
      { ...req.body },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({
        message: "Tour not found or unauthorized",
      });
    }

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update tour",
      error: error.message,
    });
  }
};

const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  try {
    const user_id = req.user._id;

    const deletedTour = await Tour.findOneAndDelete({
      _id: tourId,
      user_id,
    });

    if (!deletedTour) {
      return res.status(404).json({
        message: "Tour not found or unauthorized",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete tour",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};