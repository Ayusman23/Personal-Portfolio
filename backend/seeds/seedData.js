import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Service } from '../models/Service.js';
import { Contact } from '../models/Contact.js';
import { Certification } from '../models/Certification.js';

dotenv.config();

export const seedInitialData = async (force = false) => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount > 0 && !force) {
      console.log('Database already contains data, skipping auto-seed.');
      return;
    }

    console.log('Seeding updated SAP, DRDO, HAL portfolio data into MongoDB...');

    // 1. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'ayusman2348@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    await User.deleteMany({});
    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    // 2. Seed Profile
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Ayusman Samantaray',
      title: 'SAP Certified Full-Stack Developer | SAP Fiori | SAP BTP | ABAP Cloud | SAP S/4HANA',
      typingTitles: [
        'SAP Certified Full-Stack Developer',
        'SAP Fiori & SAPUI5 Specialist',
        'SAP BTP & ABAP Cloud Developer',
        'Full Stack MERN Developer',
        'Generative AI & Cloud Solutions',
      ],
      bio: 'SAP-certified Software Engineer and B.Tech graduate in Computer Science and Engineering (2026), with certifications in SAP Fiori, SAP BTP Solution Architecture, ABAP Cloud, SAP S/4HANA, and SAP Generative AI. Hands-on experience developing enterprise applications using SAP technologies, React.js, Node.js, TypeScript, JavaScript, SQL, and AWS through government-sector internships.',
      aboutHeading: "I'm Ayusman Samantaray, SAP Certified Full-Stack Developer",
      aboutBio: 'Passionate software engineer with hands-on production experience in SAP BTP, ABAP Cloud, SAP Fiori, Node.js, React.js, and AWS across government-sector and enterprise internships. Proven ability to automate workflows, reduce manual effort by up to 60%, and deliver scalable, secure enterprise solutions.',
      email: 'ayusman2348@gmail.com',
      phone: '+91 8328943690',
      city: 'Bhubaneswar / Koraput, Odisha, India',
      birthday: '23 Aug 2004',
      age: '20',
      degree: 'B.Tech in Computer Science and Engineering (CGPA: 7.7/10)',
      freelanceStatus: 'Open for Opportunities',
      avatarUrl: '/assets/My.jpg',
      resumeUrl: '/assets/Ayusman_Samantaray_Resume.pdf',
      githubUrl: 'https://github.com/Ayusman23',
      linkedinUrl: 'https://www.linkedin.com/in/ayusman-samantaray-153906284/',
    });

    // 3. Seed Certifications (SAP & Technical Credentials)
    await Certification.deleteMany({});
    const defaultCertDrive = 'https://drive.google.com/drive/folders/1W_p-7lCT-Yum6X0JiToYrypBppu7IcO3?usp=sharing';
    const certifications = [
      {
        title: 'SAP Certified – Solution Architect – SAP BTP',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-cubes',
        order: 1,
      },
      {
        title: 'SAP Certified – SAP Generative AI Developer',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-robot',
        order: 2,
      },
      {
        title: 'SAP Certified Associate – Business Process Integration with SAP S/4HANA',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-diagram-project',
        order: 3,
      },
      {
        title: 'SAP Certified – SAP Fiori Application Developer',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-window-maximize',
        order: 4,
      },
      {
        title: 'SAP Certified – Back-End Developer – ABAP Cloud',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-cloud-arrow-up',
        order: 5,
      },
      {
        title: 'SAP Certified – Backend Developer - SAP Cloud Application Programming Model (CAP)',
        issuer: 'SAP',
        category: 'SAP',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-server',
        order: 6,
      },
      {
        title: 'Google Cloud: Artificial Intelligence & Machine Learning',
        issuer: 'Google Cloud',
        category: 'Cloud & AI',
        issueDate: '2024',
        credentialUrl: defaultCertDrive,
        icon: 'fa-brain',
        order: 7,
      },
      {
        title: 'Fortinet: Network Security Fundamentals',
        issuer: 'Fortinet Network Academy',
        category: 'Security',
        issueDate: '2024',
        credentialUrl: defaultCertDrive,
        icon: 'fa-shield-halved',
        order: 8,
      },
      {
        title: 'AICTE EduSkills: Advanced Java & Android Development',
        issuer: 'AICTE EduSkills',
        category: 'Development',
        issueDate: '2024',
        credentialUrl: defaultCertDrive,
        icon: 'fa-mobile-screen',
        order: 9,
      },
      {
        title: 'Kaggle: Python Certification',
        issuer: 'Kaggle',
        category: 'Development',
        issueDate: '2026',
        credentialUrl: defaultCertDrive,
        icon: 'fa-python',
        order: 10,
      },
    ];
    await Certification.insertMany(certifications);

    // 4. Seed Skills
    await Skill.deleteMany({});
    const skills = [
      { name: 'SAP BTP & ABAP Cloud (RAP, CDS, OData V4)', percentage: 88, category: 'Backend', icon: 'fa-cubes', order: 1 },
      { name: 'SAP Fiori / SAPUI5 / Fiori Elements', percentage: 86, category: 'Frontend', icon: 'fa-window-restore', order: 2 },
      { name: 'React.js & Modern JavaScript (ES6+)', percentage: 85, category: 'Frontend', icon: 'fa-react', order: 3 },
      { name: 'Node.js & Express.js REST APIs', percentage: 82, category: 'Backend', icon: 'fa-node-js', order: 4 },
      { name: 'SAP Generative AI / AI Core / AI Launchpad', percentage: 80, category: 'Tools & Others', icon: 'fa-robot', order: 5 },
      { name: 'MongoDB / Mongoose & PostgreSQL / MySQL', percentage: 80, category: 'Database', icon: 'fa-database', order: 6 },
      { name: 'ASP.NET MVC & C# (.NET)', percentage: 76, category: 'Backend', icon: 'fa-microsoft', order: 7 },
      { name: 'TypeScript & Python (ML, Scikit-learn)', percentage: 78, category: 'Tools & Others', icon: 'fa-python', order: 8 },
      { name: 'AWS (EC2, S3, RDS, API Gateway, CloudFront)', percentage: 75, category: 'Tools & Others', icon: 'fa-aws', order: 9 },
      { name: 'Git & GitHub Version Control', percentage: 85, category: 'Tools & Others', icon: 'fa-git-alt', order: 10 },
      { name: 'Role-Based Access Control (RBAC) & JWT', percentage: 84, category: 'Backend', icon: 'fa-lock', order: 11 },
      { name: 'HTML5, CSS3, & Responsive UI/UX', percentage: 90, category: 'Frontend', icon: 'fa-html5', order: 12 },
    ];
    await Skill.insertMany(skills);

    // 5. Seed Education
    await Education.deleteMany({});
    const educations = [
      {
        degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
        institution: 'Government College of Engineering, Kalahandi, Bhawanipatna',
        period: 'November 2022 – April 2026 (Expected)',
        score: 'CGPA: 7.7/10',
        description: 'Undergraduate student in Computer Science and Engineering with strong focus on enterprise software architecture, full-stack web engineering, and cloud platforms.',
        order: 1,
      },
      {
        degree: 'Higher Secondary (Class XII - Science in PCMB)',
        institution: "Talents Higher Secondary School of Science & Technology, Koraput",
        period: '2020 – 2022',
        score: '79%',
        description: 'Completed Class XII in Science under the C.H.S.E board with 79% score.',
        order: 2,
      },
      {
        degree: 'Schooling (10th Board)',
        institution: 'Saraswati Shishu Vidya Mandir, Koraput',
        period: '2020',
        score: '81.66%',
        description: 'Completed Matriculation under C.H.S.E Board with 81.66% marks.',
        order: 3,
      },
    ];
    await Education.insertMany(educations);

    // 6. Seed Experience (Only HAL, DRDO ITR, and SAP S/4HANA Internships)
    await Experience.deleteMany({});
    const experiences = [
      {
        title: 'Web Development Intern',
        company: 'Hindustan Aeronautics Limited (HAL), Sunabeda, Koraput',
        period: 'June 2024 – July 2024 (Onsite)',
        location: 'Sunabeda, Koraput, Odisha',
        description: 'Developed a full-stack email automation platform using React, Node.js (Express.js), and MongoDB; eliminated repetitive manual steps and cut communication processing time by 40%. Implemented REST APIs with Express.js middleware for email processing and JWT-based authentication; handled 500+ email requests per minute under load and maintained 99.5% uptime.',
        certificateUrl: '/assets/Hal.pdf',
        offerLetterUrl: '',
        order: 1,
      },
      {
        title: 'Web Research & Development Intern (Vocational Training)',
        company: 'Integrated Test Range (ITR), DRDO, Balasore',
        period: 'June 2025 – July 2025 (Onsite - 30 Days)',
        location: 'Chandipur, Balasore, Odisha',
        description: 'Constructed a Canteen Management System using ASP.NET MVC, MySQL, and JavaScript in the Directorate of Campus Area Network & Data Centre under the guidance of Shri Antaryami Patra, Scientist-\'E\'. Designed a normalized relational database with 12+ tables and implemented 4-tier Role-Based Access Control (RBAC). Automated billing with configurable discount and payment logic, cutting manual billing effort by 60%.',
        certificateUrl: '/assets/ITR_DRDO_Certificate.pdf',
        offerLetterUrl: '',
        order: 2,
      },
      {
        title: 'SAP S/4HANA Backend Developer Intern',
        company: 'SAP Partner EME & OSDA',
        period: 'May 2026 – June 2026',
        location: 'Bhubaneswar, Odisha',
        description: 'Developed SAP RAP applications using ABAP Cloud, CDS Views, OData V4, and SAP Fiori. Worked with SAP BTP and Clean Core principles for enterprise application development.',
        certificateUrl: '',
        offerLetterUrl: '',
        order: 3,
      },
    ];
    await Experience.insertMany(experiences);

    // 7. Seed Services
    await Service.deleteMany({});
    const services = [
      {
        title: 'SAP BTP & ABAP Cloud Architecture',
        description: 'Developing enterprise solutions with ABAP RESTful Application Programming Model (RAP), CDS Views, OData V4, and Clean Core principles.',
        icon: 'fa-cubes',
        order: 1,
      },
      {
        title: 'SAP Fiori & SAPUI5 App Development',
        description: 'Building custom and Fiori Elements enterprise user experiences with role-based access control, responsive design, and real-time data sync.',
        icon: 'fa-window-restore',
        order: 2,
      },
      {
        title: 'Full Stack MERN Engineering',
        description: 'Architecting scalable web applications using MongoDB, Express.js, React.js, and Node.js with secure JWT authentication and high throughput.',
        icon: 'fa-laptop-code',
        order: 3,
      },
      {
        title: 'Enterprise AI & Generative AI Solutions',
        description: 'Integrating predictive AI models, SAP Generative AI Hub, intelligent approval workflows, and machine learning pipelines.',
        icon: 'fa-robot',
        order: 4,
      },
      {
        title: 'Cloud & DevOps Infrastructure',
        description: 'Deploying robust cloud architectures across AWS (EC2, S3, RDS, CloudFront) and SAP BTP with 99.5%+ uptime.',
        icon: 'fa-cloud',
        order: 5,
      },
      {
        title: 'Database Design & RESTful APIs',
        description: 'Designing normalized relational databases (SQL, PostgreSQL, SAP HANA) and NoSQL schemas (MongoDB) with optimized indexing.',
        icon: 'fa-database',
        order: 6,
      },
    ];
    await Service.insertMany(services);

    // 8. Seed Projects (Updated with SAP, ITR DRDO, HAL, and AI projects)
    await Project.deleteMany({});
    const projects = [
      {
        title: 'Enterprise Procurement & Purchase Approval Platform',
        description: 'Developed a Purchase Requisition workflow using ABAP RAP with multi-level approvals, custom Actions, Determinations, and Validations. Built CDS Views and exposed OData V4 services to create reusable enterprise data models and delivered a SAP Fiori Elements application with RBAC.',
        category: 'Full Stack',
        image: '/assets/portfolio.6.png',
        gitLink: 'https://github.com/Ayusman23',
        liveLink: '',
        tags: ['ABAP Cloud', 'SAP RAP', 'CDS Views', 'SAP Fiori', 'OData V4', 'SAP BTP'],
        featured: true,
        order: 1,
      },
      {
        title: 'AI-Powered Workforce Leave & Capacity Planning',
        description: 'Developed an intelligent leave management and workforce planning solution using SAP Generative AI, ABAP RAP, and SAP BTP. Implemented predictive workforce capacity insights using CDS Views and RAP Business Objects, and built a SAP Fiori dashboard providing AI-driven recommendations.',
        category: 'Full Stack',
        image: '/assets/portfolio.3.png',
        gitLink: 'https://github.com/Ayusman23',
        liveLink: '',
        tags: ['SAP Generative AI', 'SAP BTP', 'ABAP Cloud', 'SAP RAP', 'CDS Views', 'SAP Fiori'],
        featured: true,
        order: 2,
      },
      {
        title: 'Enterprise IT Asset Lifecycle Management',
        description: 'Developed an end-to-end IT asset lifecycle solution covering procurement, allocation, maintenance, and retirement. Built RAP Business Objects, CDS Views, and SAP HANA analytics to support predictive maintenance and lifecycle tracking with real-time alerts.',
        category: 'Full Stack',
        image: '/assets/portfolio.8.png',
        gitLink: 'https://github.com/Ayusman23',
        liveLink: '',
        tags: ['ABAP Cloud', 'SAP RAP', 'SAP HANA', 'SAP Fiori', 'SAP BTP'],
        featured: true,
        order: 3,
      },
      {
        title: 'ITR DRDO Canteen Management System',
        description: 'Constructed an enterprise Canteen Management System for Integrated Test Range (ITR), DRDO Chandipur using ASP.NET MVC, MySQL, and JavaScript. Unified inventory tracking, automated billing, and 4-tier Role-Based Access Control (Admin, Manager, Staff, User), cutting manual billing effort by 60%.',
        category: 'Full Stack',
        image: '/assets/portfolio.11.png',
        gitLink: 'https://github.com/Ayusman23/Canteen-Manangement-System-DRDO.git',
        liveLink: '',
        tags: ['ASP.NET MVC', 'MySQL', 'JavaScript', 'RBAC', 'DRDO ITR'],
        featured: true,
        order: 4,
      },
      {
        title: 'HAL Mail.me Email Automation Platform',
        description: 'Full-stack email automation and communication platform built during internship at Hindustan Aeronautics Limited. Features email queue management, delivery tracking, and high-throughput Express REST APIs handling 500+ requests/min.',
        category: 'Full Stack',
        image: '/assets/portfolio.2.png',
        gitLink: 'https://github.com/Ayusman23/HAL-Mail-me-Project.git',
        liveLink: '',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'HAL'],
        featured: true,
        order: 5,
      },
      {
        title: 'AI Virtual Assistant (Desktop Automation)',
        description: 'Constructed an end-to-end voice processing pipeline using Speech-Recognition and NLP with 92% command accuracy across 15+ tasks. Includes 50+ predefined commands for desktop automation, cutting manual execution time by 35%.',
        category: 'Utility Apps',
        image: '/assets/portfolio.7.png',
        gitLink: 'https://github.com/Ayusman23/AI-Virtual-Assistant.git',
        liveLink: '',
        tags: ['Python', 'Machine Learning', 'Speech Recognition', 'NLP', 'Automation'],
        featured: true,
        order: 6,
      },
      {
        title: 'Disease Prediction & Doctor Recommendation System',
        description: 'Integrated a Python ML engine (Random Forest + SVM with 85%+ accuracy across 40+ symptoms) with a MERN web layer, providing automated diagnostics, doctor recommendations, and JWT stateless authentication with RBAC.',
        category: 'Full Stack',
        image: '/assets/portfolio.9.png',
        gitLink: 'https://github.com/Ayusman23/Disease-Prediction-Doctor-Recommendation-App.git',
        liveLink: '',
        tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Python', 'Scikit-learn'],
        featured: true,
        order: 7,
      },
      {
        title: '360 Event Management Planning Platform',
        description: 'Full-featured event management platform with real-time booking sync, admin dashboard, AWS S3 image uploads, and Stripe payment processing.',
        category: 'Event Management',
        image: '/assets/portfolio.12.png',
        gitLink: 'https://github.com/Ayusman23/CBTC-360-Event-Management-Planning-Webpage.git',
        liveLink: '',
        tags: ['MERN Stack', 'Stripe API', 'AWS S3', 'CloudFront'],
        featured: true,
        order: 8,
      },
    ];
    await Project.insertMany(projects);

    console.log('Portfolio database seeded successfully with updated SAP, DRDO, HAL, and AI portfolio data!');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};
