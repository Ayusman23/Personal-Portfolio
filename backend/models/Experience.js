import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    certificateUrl: {
      type: String,
      default: '',
    },
    offerLetterUrl: {
      type: String,
      default: '',
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

export const Experience = mongoose.model('Experience', experienceSchema);
