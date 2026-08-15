import express from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCertifications).post(protect, createCertification);
router.route('/:id').put(protect, updateCertification).delete(protect, deleteCertification);

export default router;
