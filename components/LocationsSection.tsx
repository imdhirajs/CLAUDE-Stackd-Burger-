'use client';

import { useState } from 'react';

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Austin',
  'Miami',
  'Nashville',
  'Portland',
  'Seattle',
];

function CityRow({ city }: { city: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px 0',
        borderBottom: '1px solid rgba(212,132,10,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'default',
      }}
    >
      <span
        className="font-bebas"
        style={{
          fontSize: 'clamp(24px, 3vw, 36px)',
          letterSpacing: 2,
          color: hovered ? 'var(--toasted)' : 'var(--cream)',
          transition: 'color 0.25s ease',
        }}
      >
        {city.toUpperCase()}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 12,
          letterSpacing: 2,
          color: hovered ? 'var(--toasted)' : 'var(--cream-muted)',
          transition: 'color 0.25s ease',
          textTransform: 'uppercase',
        }}
      >
        {hovered ? 'VIEW LOCATION →' : 'COMING SOON'}
      </span>
    </div>
  );
}

export default function LocationsSection() {
  return (
    <section
      id="locations"
      style={{
        background: 'var(--bg-section)',
        paddingBottom: 0,
      }}
    >
      <div style={{ padding: '120px 5% 80px' }}>
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            color: 'var(--cream)',
            marginBottom: 48,
          }}
        >
          FIND US.
        </h2>

        <div style={{ maxWidth: 800 }}>
          {cities.map((city) => (
            <CityRow key={city} city={city} />
          ))}
        </div>
      </div>

      {/* Full-width CTA banner */}
      <div
        data-cursor="cta"
        style={{
          background: 'linear-gradient(135deg, #D4840A, #F0A830)',
          padding: '48px 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-bebas"
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#080400',
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          ORDER ONLINE
        </span>
      </div>
    </section>
  );
}
