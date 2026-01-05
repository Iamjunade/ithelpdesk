/**
 * Tenant Resolver Service
 * 
 * Resolves the current tenant from the URL domain/subdomain.
 * Supports both:
 * 1. Subdomain mode: company.helpdesk.com
 * 2. Custom domain mode: help.company.com
 */

import {
    collection,
    query,
    where,
    getDocs,
    limit,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Tenant } from '../types';

// Cache tenant resolution for the session
let cachedTenant: Tenant | null = null;
let cacheKey: string | null = null;

// Platform domains that should not trigger tenant resolution
const PLATFORM_DOMAINS = [
    'localhost',
    '127.0.0.1',
    'helpdesk.com',        // Main platform domain
    'helpdesk.vercel.app', // Vercel deployment
    'helpdesk-5fe0c.web.app', // Firebase hosting
];

/**
 * Check if the current domain is a platform domain (no tenant)
 */
export const isPlatformDomain = (): boolean => {
    const hostname = window.location.hostname;

    // Check if it's a platform domain
    if (PLATFORM_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
        // But also check if there's a subdomain
        const subdomain = extractSubdomain();
        // If no subdomain, it's platform domain
        return !subdomain;
    }

    return false;
};

/**
 * Extract subdomain from current URL
 * e.g., "abccorp.helpdesk.com" -> "abccorp"
 * e.g., "localhost:5173" -> null
 * e.g., "abccorp.localhost:5173" -> "abccorp" (for dev)
 */
export const extractSubdomain = (): string | null => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    // Handle localhost with subdomain (dev mode)
    // e.g., abccorp.localhost -> subdomain is "abccorp"
    if (hostname.includes('localhost')) {
        if (parts.length >= 2 && parts[0] !== 'localhost') {
            return parts[0].toLowerCase();
        }
        return null;
    }

    // Handle standard domains
    // e.g., abccorp.helpdesk.com has 3 parts
    // e.g., helpdesk.com has 2 parts (no subdomain)
    if (parts.length >= 3) {
        // Exclude 'www' as a subdomain
        const potentialSubdomain = parts[0].toLowerCase();
        if (potentialSubdomain !== 'www') {
            return potentialSubdomain;
        }
    }

    return null;
};

/**
 * Get the full custom domain for resolution
 * e.g., "help.abccorp.com" -> "help.abccorp.com"
 */
export const getCustomDomain = (): string => {
    return window.location.hostname.toLowerCase();
};

/**
 * Fetch tenant by subdomain from Firestore
 */
export const getTenantBySubdomain = async (subdomain: string): Promise<Tenant | null> => {
    try {
        const tenantsRef = collection(db, 'tenants');
        const q = query(
            tenantsRef,
            where('subdomain', '==', subdomain.toLowerCase()),
            where('is_active', '==', true),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        } as Tenant;
    } catch (error) {
        console.error('Error fetching tenant by subdomain:', error);
        return null;
    }
};

/**
 * Fetch tenant by custom domain from Firestore
 */
export const getTenantByCustomDomain = async (domain: string): Promise<Tenant | null> => {
    try {
        const tenantsRef = collection(db, 'tenants');
        const q = query(
            tenantsRef,
            where('custom_domain', '==', domain.toLowerCase()),
            where('is_active', '==', true),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        } as Tenant;
    } catch (error) {
        console.error('Error fetching tenant by custom domain:', error);
        return null;
    }
};

/**
 * Main resolver function - resolves tenant from current URL
 * 
 * Resolution order:
 * 1. Check cache
 * 2. Try subdomain resolution
 * 3. Try custom domain resolution
 * 4. Return null if no match
 */
export const resolveTenant = async (): Promise<Tenant | null> => {
    const currentKey = window.location.hostname;

    // Return cached result if hostname hasn't changed
    if (cacheKey === currentKey && cachedTenant !== null) {
        return cachedTenant;
    }

    // Check if we're on a platform domain (no tenant)
    if (isPlatformDomain()) {
        cacheKey = currentKey;
        cachedTenant = null;
        return null;
    }

    // Try subdomain resolution first
    const subdomain = extractSubdomain();
    if (subdomain) {
        const tenant = await getTenantBySubdomain(subdomain);
        if (tenant) {
            cacheKey = currentKey;
            cachedTenant = tenant;
            return tenant;
        }
    }

    // Try custom domain resolution
    const customDomain = getCustomDomain();
    const tenant = await getTenantByCustomDomain(customDomain);
    if (tenant) {
        cacheKey = currentKey;
        cachedTenant = tenant;
        return tenant;
    }

    // No tenant found
    cacheKey = currentKey;
    cachedTenant = null;
    return null;
};

/**
 * Clear the cached tenant (useful after logout or tenant switch)
 */
export const clearTenantCache = (): void => {
    cachedTenant = null;
    cacheKey = null;
};

/**
 * Check if a subdomain is available for registration
 */
export const isSubdomainAvailable = async (subdomain: string): Promise<boolean> => {
    try {
        const normalizedSubdomain = subdomain.toLowerCase().trim();

        // Check reserved subdomains
        const reserved = ['www', 'api', 'admin', 'app', 'help', 'support', 'mail', 'ftp', 'cdn'];
        if (reserved.includes(normalizedSubdomain)) {
            return false;
        }

        // Check if already taken
        const tenant = await getTenantBySubdomain(normalizedSubdomain);
        return tenant === null;
    } catch (error) {
        console.error('Error checking subdomain availability:', error);
        return false;
    }
};

/**
 * Validate subdomain format
 */
export const isValidSubdomain = (subdomain: string): boolean => {
    // Only lowercase letters, numbers, and hyphens
    // Must start with a letter, 3-63 characters
    const regex = /^[a-z][a-z0-9-]{2,62}$/;
    return regex.test(subdomain.toLowerCase());
};
