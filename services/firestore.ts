import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp,
    serverTimestamp,
} from 'firebase/firestore';
import { db, createCollection, createTenantQuery } from './firebase';
import type { Tenant, Profile } from '../types';

// Type definitions for Firestore documents
export interface FirestoreTenant extends Omit<Tenant, 'id' | 'created_at'> {
    created_at?: Timestamp;
}

export interface FirestoreProfile extends Omit<Profile, 'id' | 'created_at'> {
    created_at?: Timestamp;
}

// Tenant Operations
export const createTenant = async (tenantData: Omit<Tenant, 'id' | 'created_at'>) => {
    try {
        const tenantsCol = createCollection<FirestoreTenant>('tenants');
        const docRef = await addDoc(tenantsCol, {
            ...tenantData,
            created_at: serverTimestamp(),
        });
        return { id: docRef.id, ...tenantData };
    } catch (error) {
        console.error('Error creating tenant:', error);
        throw error;
    }
};

export const getTenantById = async (tenantId: string): Promise<Tenant | null> => {
    try {
        const tenantDoc = await getDoc(doc(db, 'tenants', tenantId));
        if (!tenantDoc.exists()) return null;

        const data = tenantDoc.data() as FirestoreTenant;
        return {
            id: tenantDoc.id,
            ...data,
            created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error getting tenant:', error);
        throw error;
    }
};

export const updateTenant = async (tenantId: string, updates: Partial<Tenant>) => {
    try {
        const tenantRef = doc(db, 'tenants', tenantId);
        await updateDoc(tenantRef, updates);
        return { success: true };
    } catch (error) {
        console.error('Error updating tenant:', error);
        throw error;
    }
};

// User Profile Operations
export const createUserProfile = async (
    userId: string,
    profileData: Omit<Profile, 'id' | 'created_at'>
) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...profileData,
            created_at: serverTimestamp(),
        });
        return { id: userId, ...profileData };
    } catch (error) {
        // If user document doesn't exist, create it
        try {
            const usersCol = createCollection<FirestoreProfile>('users');
            await addDoc(usersCol, {
                ...profileData,
                created_at: serverTimestamp(),
            });
            return { id: userId, ...profileData };
        } catch (createError) {
            console.error('Error creating user profile:', createError);
            throw createError;
        }
    }
};

export const getUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) return null;

        const data = userDoc.data() as FirestoreProfile;
        return {
            id: userDoc.id,
            ...data,
            created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        } as Profile;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId: string, updates: Partial<Profile>) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updates);
        return { success: true };
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const getUsersByTenant = async (tenantId: string): Promise<Profile[]> => {
    try {
        const usersQuery = createTenantQuery<FirestoreProfile>('users', tenantId);
        const snapshot = await getDocs(usersQuery);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            created_at: doc.data().created_at?.toDate().toISOString() || new Date().toISOString(),
        })) as Profile[];
    } catch (error) {
        console.error('Error getting users by tenant:', error);
        throw error;
    }
};

// Helper function to delete a document
export const deleteDocument = async (collectionName: string, docId: string) => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        return { success: true };
    } catch (error) {
        console.error(`Error deleting document from ${collectionName}:`, error);
        throw error;
    }
};
