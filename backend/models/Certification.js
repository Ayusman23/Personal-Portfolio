import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['SAP', 'Cloud & AI', 'Security', 'Development', 'Other'],
      default: 'SAP',
    },
    issueDate: {
      type: String,
      default: '2024 - 2026',
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'fa-certificate',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Certification = mongoose.model('Certification', certificationSchema);
