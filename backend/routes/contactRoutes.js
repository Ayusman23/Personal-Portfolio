import express from 'express';
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(submitContact).get(protect, getContacts);
router.route('/:id').patch(protect, updateContactStatus).delete(protect, deleteContact);

export default router;
