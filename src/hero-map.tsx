import { MAP_DOTS, MAP_H, MAP_W } from "@/hero-map-data";

/** Longitude/latitude to the SVG's coordinates (6 units per degree). */
function project(lon: number, lat: number): [number, number] {
  return [Math.round((lon + 25) * 6), Math.round((68 - lat) * 6)];
}

// Patients travelling to the Delhi NCR hub from these places.
const HUB = project(77.2, 28.6);
const ORIGINS = [
  { name: "London", at: project(-0.1, 51.5), dur: 7, delay: 0 },
  { name: "Lagos", at: project(3.4, 6.5), dur: 8, delay: 1.6 },
  { name: "Nairobi", at: project(36.8, -1.3), dur: 6.5, delay: 3.1 },
  { name: "Dubai", at: project(55.3, 25.2), dur: 5, delay: 0.8 },
  { name: "Moscow", at: project(37.6, 55.8), dur: 6.5, delay: 2.4 },
  { name: "Dhaka", at: project(90.4, 23.8), dur: 4.6, delay: 4 },
];

/** A gentle arc from an origin to the hub, bulging towards the top of the map. */
function arc([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M${x1} ${y1} Q${Math.round(mx)} ${Math.round(my - dist * 0.28)} ${x2} ${y2}`;
}

/** A heartbeat line: flat, small bump, sharp spike, small bump, repeated across the width. */
function ecgPath(): string {
  let d = "M0 40";
  for (let x = 0; x < 1000; x += 250) {
    d += ` H${x + 60} l8 -6 l8 6 H${x + 100} l5 5 l9 -32 l9 46 l6 -19 H${x + 170} l10 -9 l12 9 H${x + 250}`;
  }
  return d;
}

const ECG = ecgPath();

const PLUSES = [
  { left: "6%", top: "72%", dur: "16s", delay: "0s" },
  { left: "22%", top: "84%", dur: "19s", delay: "4s" },
  { left: "41%", top: "78%", dur: "17s", delay: "9s" },
  { left: "63%", top: "86%", dur: "20s", delay: "2s" },
  { left: "82%", top: "74%", dur: "18s", delay: "6s" },
  { left: "93%", top: "88%", dur: "21s", delay: "11s" },
];

/**
 * Animated hero background: a dotted world map where care-seekers' routes flow into
 * the hospital hub in India, with a heartbeat line and slow rising medical crosses.
 * Pure SVG + CSS, decorative only, and it loops for as long as the page is open.
 */
export function HeroMap() {
  return (
    <div className="hero-map" aria-hidden="true">
      <svg
        className="hero-map-svg"
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="map-dots" d={MAP_DOTS} />

        {ORIGINS.map((o) => {
          const d = arc(o.at, HUB);
          const style = {
            "--dur": `${o.dur}s`,
            "--delay": `${o.delay}s`,
          } as React.CSSProperties;
          return (
            <g key={o.name}>
              <path className="map-arc" d={d} pathLength={100} />
              <path className="map-flow" d={d} pathLength={100} style={style} />
              <circle className="map-node" cx={o.at[0]} cy={o.at[1]} r={3.2} />
              <circle
                className="map-ping"
                cx={o.at[0]}
                cy={o.at[1]}
                r={4}
                style={{ "--delay": `${o.delay}s` } as React.CSSProperties}
              />
            </g>
          );
        })}

        {/* The hospital hub: a medical cross with rings spreading out of it */}
        <g transform={`translate(${HUB[0]} ${HUB[1]})`}>
          <circle
            className="map-ping map-ping-hub"
            r={8}
            style={{ "--delay": "0s" } as React.CSSProperties}
          />
          <circle
            className="map-ping map-ping-hub"
            r={8}
            style={{ "--delay": "1.6s" } as React.CSSProperties}
          />
          <path
            className="map-cross"
            d="M-4.5 -1.5 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z"
            transform="scale(1.7)"
          />
        </g>
      </svg>

      <svg className="hero-ecg" viewBox="0 0 1000 80" preserveAspectRatio="none">
        <path className="ecg-track" d={ECG} pathLength={1000} />
        <path className="ecg-sweep" d={ECG} pathLength={1000} />
      </svg>

      {PLUSES.map((p, i) => (
        <span
          key={i}
          className="hero-plus"
          style={
            {
              left: p.left,
              top: p.top,
              "--dur": p.dur,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
