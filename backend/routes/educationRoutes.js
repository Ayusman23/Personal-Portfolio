import express from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEducation).post(protect, createEducation);
router
  .route('/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;
