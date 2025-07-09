import React, { useMemo } from 'react';

export const DynamicBanner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const generatedLines = useMemo(() => {
    const lines = [];
    const numLines = 30;
    for (let i = 0; i < numLines; i++) {
      lines.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        opacity: Math.random() * 0.1 + 0.05,
        strokeWidth: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10, // Animation duration
      });
    }
    return lines;
  }, []);

  return (
    <div className="relative overflow-hidden bg-base-100 py-6 md:py-8">
      <div className="absolute inset-0 z-0 opacity-70">
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 100 100"
        >
          <defs>
            <radialGradient id="banner-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: 'hsl(187, 85%, 50%)', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(222, 47%, 11%)', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#banner-gradient)" />
          {generatedLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#banner-gradient)"
              strokeWidth={line.strokeWidth}
            >
              <animate
                attributeName="x1"
                values={`${line.x1};${line.x2};${line.x1}`}
                dur={`${line.duration}s`}
                repeatCount="indefinite"
              />
               <animate
                attributeName="y1"
                values={`${line.y1};${line.y2};${line.y1}`}
                dur={`${line.duration + 5}s`}
                repeatCount="indefinite"
              />
                <animate
                attributeName="x2"
                values={`${line.x2};${line.x1};${line.x2}`}
                dur={`${line.duration}s`}
                repeatCount="indefinite"
              />
               <animate
                attributeName="y2"
                values={`${line.y2};${line.y1};${line.y2}`}
                dur={`${line.duration + 5}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
};