import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminAuth from '../components/AdminAuth';
import AdminPanel from '../components/AdminPanel';

export default function Admin() {
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(!!session);
  };

  if (!session) {
    return <AdminAuth onAuth={() => setSession(true)} />;
  }

  return <AdminPanel />;
} 