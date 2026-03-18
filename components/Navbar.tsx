'use client';

interface Props {
  scrollY: number;
}

export default function Navbar({ scrollY }: Props) {
  // Only go dark once the user has scrolled PAST the full canvas section (500vh)
  // 500vh - 100vh = 400vh of scroll before the sticky zone releases
  const pastCanvas =
    typeof window !== 'undefined' && scrollY > window.innerHeight * 4.2;
  const scrolled = pastCanvas;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
        background: scrolled ? 'rgba(8,4,0,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Brand */}
      <span
        className="font-bebas"
        style={{
          fontSize: 16,
          letterSpacing: 5,
          color: 'var(--cream)',
          userSelect: 'none',
        }}
      >
        STACK&apos;D
      </span>

      {/* Links + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Menu', 'Locations', 'Story'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: 2,
              color: 'var(--cream-muted)',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--toasted)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--cream-muted)';
            }}
          >
            {link}
          </a>
        ))}

        <button
          data-cursor="cta"
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            color: 'var(--bg-deep)',
            background: 'var(--toasted)',
            border: 'none',
            padding: '9px 22px',
            borderRadius: 2,
            transition: 'background 0.25s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--toasted-light)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--toasted)';
          }}
        >
          ORDER NOW
        </button>
      </div>
    </nav>
  );
}
