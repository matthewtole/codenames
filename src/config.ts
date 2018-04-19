import * as dotenv from 'dotenv';
import * as assert from 'assert';
import { FirebaseConfig } from './lib/firebase';

dotenv.load();

[
  'CN_FIREBASE_API_KEY',
  'CN_FIREBASE_AUTH_DOMAIN',
  'CN_FIREBASE_DATABASE_URL',
  'CN_FIREBASE_PROJECT_ID',
  'CN_FIREBASE_STORAGE_BUCKET',
  'CN_FIREBASE_MESSAGING_SENDER_ID',
].forEach(key =>
  assert(process.env[key], `Missing required environment variable: "${key}"`)
);

export const firebase: FirebaseConfig = {
  apiKey: process.env.CN_FIREBASE_API_KEY!,
  authDomain: process.env.CN_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.CN_FIREBASE_DATABASE_URL!,
  projectId: process.env.CN_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.CN_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.CN_FIREBASE_MESSAGING_SENDER_ID!,
};

export const COLUMNS = {
  INSTRUCTIONS: [
    'column',
    'is-half-widescreen',
    'is-two-thirds-desktop',
    'is-two-thirds-tablet',
    'is-full-mobile',
  ].join(' '),
  FORM: [
    'column',
    'is-half-widescreen',
    'is-two-thirds-desktop',
    'is-half-tablet',
    'is-full-mobile',
  ].join(' '),
};
