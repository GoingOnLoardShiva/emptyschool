"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [tooltip, setTooltip] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const data = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 65 },
    { label: "Mar", value: 80 },
    { label: "Apr", value: 55 },
    { label: "May", value: 95 },
    { label: "Jun", value: 75 },
    { label: "Jul", value: 60 },
    { label: "Aug", value: 85 },
    { label: "Sep", value: 70 },
    { label: "Oct", value: 90 },
    { label: "Nov", value: 50 },
    { label: "Dec", value: 100 },
  ];

  const width = 500;
  const height = 250;
  const padding = 40;

  const maxValue = Math.max(...data.map((d) => d.value));

  const getX = (i) => padding + (i * (width - padding * 2)) / (data.length - 1);

  const getY = (value) =>
    height - padding - (value / maxValue) * (height - padding * 2);

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.value)}`)
    .join(" ");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="student chart system">
          <div className="p-4 bg-orange-500 rounded-2xl shadow">
            <h2 className="font-semibold">Students</h2>
            <p className="text-sm text-white">Overview of student stats</p>
          </div>
          <div className="chart">
            <div className="relative w-full rounded-2xl shadow">
              <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
                {/* Frame around chart (animated) */}
                <rect
                  x={padding - 8}
                  y={padding - 8}
                  width={width - (padding - 8) * 2}
                  height={height - (padding - 8) * 2}
                  rx="12"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  className={`chart-frame ${animated ? "frame-animate" : ""}`}
                />

                {/* Vertical bars */}
                {data.map((d, i) => {
                  const groupWidth = (width - padding * 2) / data.length;
                  const barW = groupWidth * 0.6;
                  const x = padding + i * groupWidth + (groupWidth - barW) / 2;
                  const barH = (d.value / maxValue) * (height - padding * 2);
                  const y = height - padding - barH;

                  return (
                    <g key={i} className="cursor-pointer">
                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        fill="#2563eb"
                        className={`bar ${animated ? "bar-animate" : ""}`}
                        style={{ animationDelay: `${i * 120}ms` }}
                        onMouseEnter={(e) =>
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            label: d.label,
                            value: d.value,
                          })
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />

                      <text
                        x={x + barW / 2}
                        y={height - padding + 16}
                        fontSize="12"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {tooltip && (
                <div
                  className="fixed bg-black text-white text-sm px-3 py-2 rounded-lg shadow"
                  style={{ top: tooltip.y - 50, left: tooltip.x + 10 }}
                >
                  <div>{tooltip.label}</div>
                  <div className="font-bold">{tooltip.value}</div>
                </div>
              )}

              {/* Animation */}
              <style jsx>{`
                /* Bar grow animation (scaleY from bottom) */
                @keyframes grow {
                  from {
                    transform: scaleY(0);
                  }
                  to {
                    transform: scaleY(1);
                  }
                }

                .bar {
                  transform-origin: center bottom;
                }

                .bar-animate {
                  animation: grow 700ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
                }

                .bar:hover {
                  fill: #1e40af;
                }

                /* Frame draw + subtle motion */
                .chart-frame {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                  transition: stroke-dashoffset 800ms ease-out;
                }

                .frame-animate {
                  animation: drawFrame 900ms ease-out forwards,
                    pulse 2400ms ease-in-out 900ms infinite alternate;
                }

                @keyframes drawFrame {
                  to {
                    stroke-dashoffset: 0;
                  }
                }

                @keyframes pulse {
                  from {
                    transform: translateY(0);
                    opacity: 0.98;
                  }
                  to {
                    transform: translateY(-4px);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
        <div className="techer-chart">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Teachers</h2>
            <p className="text-sm text-gray-500">Overview of teacher stats</p>
          </div>
          <div className="chart">
            <div className="relative w-full rounded-2xl shadow">
              <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
                {/* Frame around chart (animated) */}
                <rect
                  x={padding - 8}
                  y={padding - 8}
                  width={width - (padding - 8) * 2}
                  height={height - (padding - 8) * 2}
                  rx="12"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  className={`chart-frame ${animated ? "frame-animate" : ""}`}
                />

                {/* Vertical bars */}
                {data.map((d, i) => {
                  const groupWidth = (width - padding * 2) / data.length;
                  const barW = groupWidth * 0.6;
                  const x = padding + i * groupWidth + (groupWidth - barW) / 2;
                  const barH = (d.value / maxValue) * (height - padding * 2);
                  const y = height - padding - barH;

                  return (
                    <g key={i} className="cursor-pointer">
                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        fill="#2563eb"
                        className={`bar ${animated ? "bar-animate" : ""}`}
                        style={{ animationDelay: `${i * 120}ms` }}
                        onMouseEnter={(e) =>
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            label: d.label,
                            value: d.value,
                          })
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />

                      <text
                        x={x + barW / 2}
                        y={height - padding + 16}
                        fontSize="12"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {tooltip && (
                <div
                  className="fixed bg-black text-white text-sm px-3 py-2 rounded-lg shadow"
                  style={{ top: tooltip.y - 50, left: tooltip.x + 10 }}
                >
                  <div>{tooltip.label}</div>
                  <div className="font-bold">{tooltip.value}</div>
                </div>
              )}

              {/* Animation */}
              <style jsx>{`
                /* Bar grow animation (scaleY from bottom) */
                @keyframes grow {
                  from {
                    transform: scaleY(0);
                  }
                  to {
                    transform: scaleY(1);
                  }
                }

                .bar {
                  transform-origin: center bottom;
                }

                .bar-animate {
                  animation: grow 700ms cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
                }

                .bar:hover {
                  fill: #1e40af;
                }

                /* Frame draw + subtle motion */
                .chart-frame {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                  transition: stroke-dashoffset 800ms ease-out;
                }

                .frame-animate {
                  animation: drawFrame 900ms ease-out forwards,
                    pulse 2400ms ease-in-out 900ms infinite alternate;
                }

                @keyframes drawFrame {
                  to {
                    stroke-dashoffset: 0;
                  }
                }

                @keyframes pulse {
                  from {
                    transform: translateY(0);
                    opacity: 0.98;
                  }
                  to {
                    transform: translateY(-4px);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Fees</h2>
          <p className="text-sm text-gray-500">Fee collection summary</p>
        </div>
      </div>
    </div>
  );
}
