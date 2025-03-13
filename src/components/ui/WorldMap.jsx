"use client";

import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

const WorldMap = ({ dots = [], lineColor = "#3b82f6" }) => {
  const svgRef = useRef(null);

  // Memoize the map generation to prevent unnecessary recalculations
  const svgMap = useMemo(() => {
    const map = new DottedMap({ 
      height: 150, // Reduced height
      grid: "diagonal",
      spacing: 35, // Increased spacing between dots
    });

    return map.getSVG({
      radius: 0.25,
      color: "#1e40af50",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  // Memoize point projection calculations
  const projectedDots = useMemo(() => 
    dots.map(dot => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng)
    }))
  , [dots]);

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        draggable={false}
        loading="eager" // Prioritize loading
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {projectedDots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={createCurvedPath(dot.start, dot.end)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1,
                delay: Math.min(0.2 * i, 2), // Cap the maximum delay
                ease: "easeOut" 
              }}
            />
          </g>
        ))}

        {/* Reduce gradient stops */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {projectedDots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {[dot.start, dot.end].map((point, j) => (
              <g key={`${i}-${j}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill={lineColor}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="6"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Move helper functions outside component
const projectPoint = (lat, lng) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export default WorldMap;