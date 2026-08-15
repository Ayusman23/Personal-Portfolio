import { Profile } from '../models/Profile.js';

// @desc    Get profile information
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile information
// @route   PUT /api/profile
// @access  Private (Admin)
export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    const updatedProfile = await profile.save();
    res.json({ success: true, data: updatedProfile, message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};
