import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminAuth from '../components/AdminAuth';
import AdminPanel from '../components/AdminPanel';

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    checkSession();
    
    // Listen for authentication changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(!!session);
    } catch (error) {
      console.error('Error checking session:', error);
      setSession(false);
    }
  };

  // Show loading state
  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return <AdminAuth onAuth={() => setSession(true)} />;
  }

  return <AdminPanel />;
} 