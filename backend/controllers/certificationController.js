import { Certification } from '../models/Certification.js';

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: certs.length, data: certs });
  } catch (error) {
    next(error);
  }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private (Admin)
export const createCertification = async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert, message: 'Certification added successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private (Admin)
export const updateCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.json({ success: true, data: cert, message: 'Certification updated successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private (Admin)
export const deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    next(error);
  }
};
