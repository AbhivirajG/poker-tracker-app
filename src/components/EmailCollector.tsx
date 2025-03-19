import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface EmailCollectorProps {
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function EmailCollector({ 
  buttonText = "Join Beta",
  placeholder = "Enter your .edu email",
  className = ""
}: EmailCollectorProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('.edu')) {
      setStatus('error');
      setErrorMessage('Please use a .edu email address');
      return;
    }

    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('emails')
        .insert([{ email }]);  // timestamp will be set by default in the database

      if (error) {
        if (error.code === '23505') {  // Unique violation error code
          setStatus('error');
          setErrorMessage('This email has already been registered');
        } else {
          throw error;
        }
        return;
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus('idle');
            setErrorMessage('');
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          disabled={status === 'loading' || status === 'success'}
        />
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
        {status === 'success' && (
          <p className="mt-2 text-sm text-green-600">Thanks for joining! We'll be in touch soon.</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors
          ${status === 'success'
            ? 'bg-green-600 text-white'
            : status === 'loading'
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
      >
        {status === 'loading' ? 'Joining...' : 
         status === 'success' ? 'Joined!' : 
         buttonText}
      </button>
    </form>
  );
} 