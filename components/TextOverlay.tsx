'use client';

import { useState, useEffect } from 'react';

interface Props {
  progress: number;
}

function getOpacity(progress: number, start: number, end: number): number {
  const fadeWidth = 0.04;
  if (progress < start) return 0;
  if (progress > end) return 0;
  if (progress < start + fadeWidth) return (progress - start) / fadeWidth;
  if (progress > end - fadeWidth) return (end - progress) / fadeWidth;
  return 1;
}

function SectionWrapper({
  children,
  opacity,
  style,
}: {
  children: React.ReactNode;
  opacity: number;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        transform: `translateY(${(1 - opacity) * 20}px)`,
        transition: 'none',
        pointerEvents: opacity > 0.1 ? 'auto' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const label: React.CSSProperties = {
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: 4,
  color: 'var(--toasted)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 12,
};

export default function TextOverlay({ progress }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const headlineScale = isMobile ? 0.55 : 1;

  const s1 = getOpacity(progress, 0, 0.22);
  const s2 = getOpacity(progress, 0.30, 0.55);
  const s3 = getOpacity(progress, 0.60, 0.78);
  const s4 = getOpacity(progress, 0.84, 1.0);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Section 1 — Built Different */}
      <SectionWrapper
        opacity={s1}
        style={{ bottom: '15%', left: '10%', maxWidth: 520 }}
      >
        <span style={label}>100% GRASS-FED</span>
        <h1
          className="font-bebas text-gradient-gold"
          style={{
            fontSize: 110 * headlineScale,
            letterSpacing: 4,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            display: 'block',
          }}
        >
          BUILT
          <br />
          DIFFERENT.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--cream-muted)',
            marginTop: 24,
            lineHeight: 1.85,
          }}
        >
          Every ingredient chosen with obsessive intent.
        </p>
      </SectionWrapper>

      {/* Section 2 — Layer by Layer */}
      <SectionWrapper
        opacity={s2}
        style={{ top: '18%', right: '8%', textAlign: 'right', maxWidth: 440 }}
      >
        <span style={{ ...label, display: 'block', textAlign: 'right' }}>
          LAYER BY LAYER
        </span>
        <h2
          className="font-bebas"
          style={{
            fontSize: 88 * headlineScale,
            letterSpacing: 3,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--cream)',
            display: 'block',
          }}
        >
          LAYER
          <br />
          BY
          <br />
          LAYER.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--cream-muted)',
            marginTop: 24,
          }}
        >
          Fresh. Real. Uncompromising.
        </p>
      </SectionWrapper>

      {/* Section 3 — The Stack is Perfect */}
      <SectionWrapper
        opacity={s3}
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${(1 - s3) * 20}px))`,
          textAlign: 'center',
          width: '100%',
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
          pointerEvents: s3 > 0.1 ? 'auto' : 'none',
        }}
      >
        <span style={{ ...label, textAlign: 'center', display: 'block' }}>
          THE STACK IS PERFECT
        </span>
        <h2
          className="font-bebas text-gradient-stack"
          style={{
            fontSize: 96 * headlineScale,
            letterSpacing: 4,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            display: 'block',
          }}
        >
          THE STACK
          <br />
          IS PERFECT.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--cream-muted)',
            marginTop: 24,
          }}
        >
          100% grass-fed. Always fresh. Never frozen.
        </p>
      </SectionWrapper>

      {/* Section 4 — CTA */}
      <SectionWrapper
        opacity={s4}
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${(1 - s4) * 20}px))`,
          textAlign: 'center',
          width: '100%',
          maxWidth: 700,
          pointerEvents: s4 > 0.1 ? 'auto' : 'none',
        }}
      >
        <h2
          className="font-bebas"
          style={{
            fontSize: 104 * headlineScale,
            letterSpacing: 4,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: 'var(--cream)',
            display: 'block',
          }}
        >
          ORDER THE
          <br />
          OBSESSION.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--cream-muted)',
            marginTop: 20,
          }}
        >
          Now open. Always worth the wait.
        </p>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <button
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#080400',
              background: 'linear-gradient(135deg, #D4840A, #F0A830)',
              border: 'none',
              padding: '20px 56px',
              borderRadius: 0,
              boxShadow: '0 0 60px rgba(212,132,10,0.5)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            FIND YOUR NEAREST →
          </button>
          <a
            href="#locations"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 13,
              fontWeight: 400,
              color: 'var(--toasted)',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor =
                'var(--toasted)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
            }}
          >
            View Full Menu
          </a>
        </div>
      </SectionWrapper>
    </div>
  );
}
