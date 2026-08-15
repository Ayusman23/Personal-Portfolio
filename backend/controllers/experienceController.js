import { Experience } from '../models/Experience.js';

// @desc    Get all experience items
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience item
// @route   POST /api/experiences
// @access  Private (Admin)
export const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience, message: 'Experience added successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience item
// @route   PUT /api/experiences/:id
// @access  Private (Admin)
export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    res.json({ success: true, data: experience, message: 'Experience updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience item
// @route   DELETE /api/experiences/:id
// @access  Private (Admin)
export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};
