'use dom';

import React from 'react';

interface MotivationalQuoteProps {
  quote: string;
  author: string;
  onRefresh?: () => void;
}

export default function MotivationalQuoteDOM({
  quote,
  author,
  onRefresh
}: MotivationalQuoteProps) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: onRefresh ? 'pointer' : 'default',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      margin: '16px',
    }}
      onClick={onRefresh}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Animated background pattern */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        animation: 'float 20s infinite linear',
        pointerEvents: 'none',
      }} />

      {/* Quote content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <blockquote style={{
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 16px 0',
          fontStyle: 'italic',
          textAlign: 'center',
        }}>
          "{quote}"
        </blockquote>

        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.9,
          fontWeight: '500',
        }}>
          — {author}
        </div>
      </div>

      {/* Refresh indicator */}
      {onRefresh && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '12px',
          opacity: 0.7,
          cursor: 'pointer',
        }}>
          ↻
        </div>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-20px) translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
