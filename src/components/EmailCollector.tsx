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
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
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
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
                setErrorMessage('');
              }}
              placeholder={placeholder}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              disabled={status === 'loading' || status === 'success'}
            />
            {status === 'success' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg 
                  className="w-5 h-5 text-green-500 animate-scale-check" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                    className="animate-draw-check"
                  />
                </svg>
              </div>
            )}
          </div>
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMessage}
            </p>
          )}
          {status === 'success' && (
            <div className="mt-2 text-sm text-green-600 flex items-center gap-2 animate-fade-in">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>
                <span className="font-medium">Success!</span> Check your inbox for next steps.
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
            ${status === 'success'
              ? 'bg-green-600 text-white transform scale-95'
              : status === 'loading'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105'
            }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Joining...
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Joined!
            </span>
          ) : buttonText}
        </button>
      </form>
    </div>
  );
} 