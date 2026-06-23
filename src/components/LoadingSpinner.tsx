'use client';

import React from 'react';
import AuthBackground from '@/app/(auth)/_components/AuthBackground';

interface LoadingSpinnerProps {
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingSpinner({ 
  message = "불러오는 중입니다...", 
  fullscreen = true 
}: LoadingSpinnerProps) {
  return (
    <div
      style={{
        position: fullscreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: fullscreen ? '100vw' : '100%',
        height: fullscreen ? '100vh' : '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(249, 250, 251, 0.85)',
        zIndex: 99999,
      }}
    >
      <AuthBackground />
      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <svg viewBox="0 0 100 100" style={{ width: '60px', height: '60px' }}>
          <style>{`
            @keyframes guguSpinner {
              0% { opacity: 1; }
              100% { opacity: 0.15; }
            }
            .spinner-bar {
              animation: guguSpinner 1.2s linear infinite;
              fill: #EF466E;
            }
            .bar-1 { animation-delay: 0s; }
            .bar-2 { animation-delay: -0.15s; }
            .bar-3 { animation-delay: -0.3s; }
            .bar-4 { animation-delay: -0.45s; }
            .bar-5 { animation-delay: -0.6s; }
            .bar-6 { animation-delay: -0.75s; }
            .bar-7 { animation-delay: -0.9s; }
            .bar-8 { animation-delay: -1.05s; }
          `}</style>
          <rect className="spinner-bar bar-1" x="46" y="10" width="8" height="20" rx="4" transform="rotate(0 50 50)" />
          <rect className="spinner-bar bar-8" x="46" y="10" width="8" height="20" rx="4" transform="rotate(45 50 50)" />
          <rect className="spinner-bar bar-7" x="46" y="10" width="8" height="20" rx="4" transform="rotate(90 50 50)" />
          <rect className="spinner-bar bar-6" x="46" y="10" width="8" height="20" rx="4" transform="rotate(135 50 50)" />
          <rect className="spinner-bar bar-5" x="46" y="10" width="8" height="20" rx="4" transform="rotate(180 50 50)" />
          <rect className="spinner-bar bar-4" x="46" y="10" width="8" height="20" rx="4" transform="rotate(225 50 50)" />
          <rect className="spinner-bar bar-3" x="46" y="10" width="8" height="20" rx="4" transform="rotate(270 50 50)" />
          <rect className="spinner-bar bar-2" x="46" y="10" width="8" height="20" rx="4" transform="rotate(315 50 50)" />
        </svg>
        <span style={{ color: '#083b4d', fontWeight: 800, fontSize: '16px' }}>
          {message}
        </span>
      </div>
    </div>
  );
}