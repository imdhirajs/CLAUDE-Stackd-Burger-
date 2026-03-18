'use client';

import { useState } from 'react';

const ingredients = [
  {
    name: 'BEEF',
    description: '100% grass-fed, never frozen. Smashed to order on a cast iron flat top.',
    color: '#CC2200',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="28" rx="18" ry="10" fill="currentColor" opacity="0.9" />
        <ellipse cx="24" cy="24" rx="16" ry="8" fill="currentColor" opacity="0.7" />
        <path d="M8 24 Q24 14 40 24" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'LETTUCE',
    description: 'Crisp iceberg, sourced daily from local farms. Cold, crunchy, alive.',
    color: '#4CAF50',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8 C12 12 8 24 10 36 C16 32 24 28 38 30 C40 18 34 10 24 8Z" fill="currentColor" opacity="0.85" />
        <path d="M20 14 C18 20 20 28 22 34" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: 'CHEESE',
    description: 'American single, melted over twice. A molten blanket of gold.',
    color: '#F0A830',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="18" width="36" height="14" rx="2" fill="currentColor" opacity="0.9" />
        <path d="M6 18 L18 8 L42 8 L42 18" fill="currentColor" opacity="0.6" />
        <path d="M42 8 L42 22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: 'BUN',
    description: 'Brioche, toasted butter-side down. Sesame seeds hand-placed. The throne.',
    color: '#D4840A',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="20" rx="18" ry="12" fill="currentColor" opacity="0.9" />
        <ellipse cx="24" cy="32" rx="18" ry="5" fill="currentColor" opacity="0.6" />
        <circle cx="20" cy="16" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="27" cy="13" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="32" cy="17" r="1.5" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
  },
];

function Card({ ingredient }: { ingredient: typeof ingredients[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        borderTop: `2px solid ${hovered ? '#F0A830' : '#D4840A'}`,
        padding: '36px 28px',
        flex: 1,
        minWidth: 220,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, border-top-color 0.3s ease',
      }}
    >
      <div style={{ color: ingredient.color, marginBottom: 20 }}>
        {ingredient.icon}
      </div>
      <h3
        className="font-bebas"
        style={{
          fontSize: 20,
          letterSpacing: 2,
          color: 'var(--cream)',
          marginBottom: 12,
        }}
      >
        {ingredient.name}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 14,
          fontWeight: 300,
          color: 'var(--cream-muted)',
          lineHeight: 1.7,
        }}
      >
        {ingredient.description}
      </p>
    </div>
  );
}

export default function IngredientsSection() {
  return (
    <section
      id="menu"
      style={{
        background: 'var(--bg-section)',
        padding: '120px 5%',
      }}
    >
      <h2
        className="font-bebas"
        style={{
          fontSize: 'clamp(40px, 6vw, 64px)',
          letterSpacing: 3,
          color: 'var(--cream)',
          marginBottom: 64,
        }}
      >
        WHAT GOES IN.
      </h2>
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {ingredients.map((ing) => (
          <Card key={ing.name} ingredient={ing} />
        ))}
      </div>
    </section>
  );
}
