import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Web Development',
      enum: ['All', 'Web Development', 'Full Stack', 'UI/UX Design', 'Landing Page', 'Event Management', 'Utility Apps'],
    },
    image: {
      type: String,
      required: true,
    },
    gitLink: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
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

export const Project = mongoose.model('Project', projectSchema);
