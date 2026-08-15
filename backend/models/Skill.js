import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      default: 'Frontend',
      enum: ['Frontend', 'Backend', 'Database', 'Tools & Others'],
    },
    icon: {
      type: String,
      default: 'fa-code',
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

export const Skill = mongoose.model('Skill', skillSchema);
