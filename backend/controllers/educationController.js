import { Education } from '../models/Education.js';

// @desc    Get all education items
// @route   GET /api/education
// @access  Public
export const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: education.length, data: education });
  } catch (error) {
    next(error);
  }
};

// @desc    Create education item
// @route   POST /api/education
// @access  Private (Admin)
export const createEducation = async (req, res, next) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'Education added successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education item
// @route   PUT /api/education/:id
// @access  Private (Admin)
export const updateEducation = async (req, res, next) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Education item not found' });
    }
    res.json({ success: true, data: item, message: 'Education updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education item
// @route   DELETE /api/education/:id
// @access  Private (Admin)
export const deleteEducation = async (req, res, next) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Education item not found' });
    }
    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    next(error);
  }
};
