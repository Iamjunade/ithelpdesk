import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { getUserProfile, getTenantById } from './firestore';
import { Profile, Tenant } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  tenant: Tenant | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndTenant = async (userId: string) => {
    try {
      // Fetch user profile from Firestore
      const profileData = await getUserProfile(userId);

      if (profileData) {
        setProfile(profileData);

        // Fetch tenant data
        if (profileData.tenant_id) {
          const tenantData = await getTenantById(profileData.tenant_id);
          if (tenantData) {
            setTenant(tenantData);

            // Apply tenant branding to CSS variables
            const root = document.documentElement;
            root.style.setProperty('--primary-color', tenantData.primary_color);
            root.style.setProperty('--secondary-color', tenantData.secondary_color);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await fetchProfileAndTenant(firebaseUser.uid);
      } else {
        setProfile(null);
        setTenant(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
    setTenant(null);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfileAndTenant(user.uid);
  };

  return (
    <AuthContext.Provider value={{ user, profile, tenant, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
