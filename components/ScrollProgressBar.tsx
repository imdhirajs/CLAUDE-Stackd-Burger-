'use client';

interface Props {
  progress: number;
}

export default function ScrollProgressBar({ progress }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, #D4840A, #CC2200, #4CAF50)',
        zIndex: 9997,
        pointerEvents: 'none',
        transition: 'width 0.05s linear',
      }}
    />
  );
}
