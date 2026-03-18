'use client';

const stats = [
  { number: '100%', label: 'GRASS-FED' },
  { number: '0',    label: 'FROZEN INGREDIENTS' },
  { number: '14hrs', label: 'PREP TO PLATE' },
];

export default function StatsSection() {
  return (
    <section
      style={{
        background: 'var(--bg-deep)',
        padding: '100px 5%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: 0,
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 64px',
              borderLeft:
                i > 0 ? '1px solid rgba(212,132,10,0.2)' : 'none',
              flex: '1 1 200px',
              minWidth: 200,
            }}
          >
            <span
              className="font-bebas"
              style={{
                fontSize: 'clamp(48px, 5vw, 72px)',
                color: 'var(--toasted)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              {stat.number}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 4,
                color: 'var(--cream-muted)',
                textTransform: 'uppercase',
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
