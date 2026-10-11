import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

const projectRoot = path.resolve(import.meta.dirname, '..');
const envPath = path.join(projectRoot, '.env');

const loadEnv = () => {
  const env = {};

  if (!fs.existsSync(envPath)) {
    return env;
  }

  const raw = fs.readFileSync(envPath, 'utf8');
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    env[key] = value.replace(/^['"]|['"]$/g, '');
  }

  return env;
};

const env = loadEnv();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

if (missingKeys.length) {
  throw new Error(`Missing Firebase config values: ${missingKeys.join(', ')}`);
}

const projects = [
  {
    title: 'HealthSync',
    category: 'Health & Fitness App',
    desc: 'An AI-powered clinical dashboard platform designed to streamline medical workflows, automate doctor prescriptions, and coordinate patient history records.',
    caseStudyLink: 'https://app.notion.com/p/HealthSync-Case-Study-38f7a7a1bfaa807a93bedac9df521685?source=copy_link',
    prototypeLink: 'https://www.figma.com/proto/17GDkq96pXfM0JRlKwO1Uz/HealthSync---Project?page-id=0%3A1&node-id=191-42&starting-point-node-id=191%3A42',
    websiteLink: '',
    theme: 'dark',
    logoType: 'plus',
    order: 1,
  },
  {
    title: 'KKosh',
    category: 'E-Commerce Platform',
    desc: 'An ethnicwear e-commerce portal and brand experience. Designed high-fidelity prototypes, user checkout filters, and custom product catalogs.',
    caseStudyLink: '',
    prototypeLink: '',
    websiteLink: 'https://kkosh.in/',
    theme: 'light',
    logoType: 'circle',
    order: 2,
  },
  {
    title: 'NSPL',
    category: 'Sports Website',
    desc: 'A tournament tracking web app detailing live scores, match brackets, and player statistics. Constructed dashboard designs and administration log panels.',
    caseStudyLink: 'https://app.notion.com/p/Celebal-Technologies-Internship-Projects-38f7a7a1bfaa807a82cde13e8ee2c97b?source=copy_link',
    prototypeLink: 'https://www.figma.com/proto/3JVhVyjB77Rbdjt5sj6Oih',
    websiteLink: '',
    theme: 'dark',
    logoType: 'stack',
    order: 3,
  },
  {
    title: 'Celebal Technologies',
    category: 'Internship Projects',
    desc: 'Designed corporate landing pages, user flows, and brand libraries. Standardized layout systems to drive B2B user conversions and credibility.',
    caseStudyLink: 'https://app.notion.com/p/Celebal-Technologies-Internship-Projects-38f7a7a1bfaa807a82cde13e8ee2c97b?source=copy_link',
    prototypeLink: '',
    websiteLink: '',
    theme: 'light',
    logoType: 'square',
    order: 4,
  },
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedProjects = async () => {
  try {
    for (const project of projects) {
      await addDoc(collection(db, 'portfolioProjects'), {
        ...project,
        createdAt: serverTimestamp(),
      });
      console.log(`Inserted project: ${project.title}`);
    }

    console.log(`Successfully added ${projects.length} projects to Firestore.`);
  } catch (error) {
    console.error('Failed to write projects to Firestore:', error);
    process.exitCode = 1;
  }
};

seedProjects();
