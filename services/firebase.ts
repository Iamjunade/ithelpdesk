import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import {
    getFirestore,
    collection,
    query,
    where,
    CollectionReference,
    DocumentData,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL-lN7ikVnSo92AFKd1JwLXSMAZLMxZYA",
    authDomain: "helpdesk-5fe0c.firebaseapp.com",
    projectId: "helpdesk-5fe0c",
    storageBucket: "helpdesk-5fe0c.firebasestorage.app",
    messagingSenderId: "174650276296",
    appId: "1:174650276296:web:db45cd7ee77e32985568fd",
    measurementId: "G-0NG67FZRKS"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Helper function to create a typed collection reference
export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>;
};

// Helper function to create tenant-scoped query
export const createTenantQuery = <T = DocumentData>(
    collectionName: string,
    tenantId: string
) => {
    const col = createCollection<T>(collectionName);
    return query(col, where('tenant_id', '==', tenantId));
};

export default app;
