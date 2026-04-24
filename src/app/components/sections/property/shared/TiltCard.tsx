
import React, { useRef, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;

  className?: string;
  maxTilt?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-damped rotation values
  const rotateY = useSpring(
    useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]),
    { stiffness: 140, damping: 22 }
  );
  const rotateX = useSpring(
    useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]),
    { stiffness: 140, damping: 22 }
  );

  const hlX = useTransform(rawX, [-1, 1], [22, 78]); // % across width
  const hlY = useTransform(rawY, [-1, 1], [22, 78]); // % down height
  const hlBg = useMotionTemplate`radial-gradient(ellipse 60% 42% at ${hlX}% ${hlY}%, rgba(255,255,255,0.22) 0%, transparent 62%)`;

  const gyroActive = useRef(false);

  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      gyroActive.current = true;
      rawX.set(Math.max(-1, Math.min(1, e.gamma / 25)));
      rawY.set(Math.max(-1, Math.min(1, (e.beta - 90) / 25)));
    },
    [rawX, rawY]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (gyroActive.current || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    if (gyroActive.current) return;
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    const el = wrapRef.current;
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    el?.addEventListener('mousemove', handleMouseMove);
    el?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      el?.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleOrientation, handleMouseMove, handleMouseLeave]);

  return (
    <div ref={wrapRef} style={{ perspective: '1200px' }} className="w-full">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className={`relative ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
          style={{ background: hlBg }}
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
