import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase
          .from('emails')
          .select('count')
          .single();

        if (error) throw error;
        console.log('Supabase connection successful:', data);
        setStatus('success');
      } catch (err) {
        console.error('Supabase connection error:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  if (status === 'loading') {
    return <div>Testing connection...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return <div className="text-green-600">Connected to Supabase successfully!</div>;
} 