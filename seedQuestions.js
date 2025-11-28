import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

// Native Node import for JSON
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

// 1. Initialize Admin SDK (Bypasses all rules)
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// 2. Define your questions here
// Key = The Date (YYYY-MM-DD), Value = The Question Data
const questionsToAdd = [
    {
        id: "2025-11-24", // Make sure this matches today's date if you want to test now!
        data: {
            questionText: "Which planet is known as the Red Planet?",
            options: {
                a: "Earth",
                b: "Mars",
                c: "Jupiter",
            },
            correctAnswer: "b",
            explanation: "Mars is red because of iron oxide (rust) on its surface."
        }
    },
    {
        id: "2025-11-25",
        data: {
            questionText: "What is the capital of France?",
            options: {
                a: "London",
                b: "Berlin",
                c: "Paris",
            },
            correctAnswer: "c",
            explanation: "Paris has been the capital of France since the middle ages."
        }
    }
];

// 3. Upload Function
async function seedDatabase() {
    const ARTIFACT_ID = 'default-app'; // Ensure this matches your frontend config
    console.log(`🚀 Starting seed for ${ARTIFACT_ID}...`);

    for (const q of questionsToAdd) {
        // Path: artifacts -> [ID] -> public -> data -> questions -> [Date]
        const docRef = db.doc(`artifacts/${ARTIFACT_ID}/public/data/questions/${q.id}`);

        await docRef.set(q.data);
        console.log(`✅ Wrote question for date: ${q.id}`);
    }

    console.log('🎉 Done!');
}

seedDatabase();