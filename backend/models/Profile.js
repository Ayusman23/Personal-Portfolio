import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Ayusman Samantaray',
    },
    title: {
      type: String,
      required: true,
      default: 'Full Stack MERN Developer',
    },
    typingTitles: [
      {
        type: String,
      },
    ],
    bio: {
      type: String,
      required: true,
      default: "I'm a web developer with extensive experience building modern web applications. My expertise is in Full Stack MERN development, dynamic responsive UI/UX design, REST APIs, and scalable web architectures.",
    },
    aboutHeading: {
      type: String,
      default: "I'm Ayusman Samantaray and a Full Stack MERN Developer",
    },
    aboutBio: {
      type: String,
      default: "I'm a passionate web developer with over 1 year of hands-on experience in modern web technologies. I specialize in building responsive, fast, and secure web applications with intuitive user interfaces.",
    },
    email: {
      type: String,
      required: true,
      default: 'ayusmansamantaray23@gmail.com',
    },
    phone: {
      type: String,
      default: '+91 8328943690',
    },
    city: {
      type: String,
      default: 'Koraput, Odisha',
    },
    birthday: {
      type: String,
      default: '23 Aug 2004',
    },
    age: {
      type: String,
      default: '20',
    },
    degree: {
      type: String,
      default: 'B.Tech in Computer Science and Engineering',
    },
    freelanceStatus: {
      type: String,
      default: 'Available',
    },
    avatarUrl: {
      type: String,
      default: '/assets/My.jpg',
    },
    resumeUrl: {
      type: String,
      default: '/assets/My cv.pdf',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/Ayusman23',
    },
    linkedinUrl: {
      type: String,
      default: 'https://linkedin.com/in/ayusman-samantaray',
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model('Profile', profileSchema);
