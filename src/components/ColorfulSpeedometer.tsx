import React from 'react';

const Speedometer = () => {
  return (
    <div className="w-64 h-64 relative">
      {/* Speedometer background */}
      <svg
        className="w-full h-full absolute"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ccc"
          strokeWidth="3"
        />
        {/* Colored dial */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="blue" // Change the color as needed
          strokeWidth="15" // Adjust the thickness as needed
          strokeLinecap="round"
          strokeDasharray="0 1000"
          strokeDashoffset="0"
        />
        {/* Speedometer ticks */}
        {Array.from({ length: 11 }, (_, index) => {
          const angle = (180 / 10) * index;
          const x1 = 50 + 40 * Math.cos((angle - 90) * (Math.PI / 180));
          const y1 = 50 + 40 * Math.sin((angle - 90) * (Math.PI / 180));
          const x2 = 50 + 45 * Math.cos((angle - 90) * (Math.PI / 180));
          const y2 = 50 + 45 * Math.sin((angle - 90) * (Math.PI / 180));
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ccc"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Needle arrow */}
      <div className="w-2 h-32 bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-bottom" />

      {/* Center circle */}
      <div className="w-10 h-10 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default Speedometer;
