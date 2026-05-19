export const spring = {
  gentle: { damping: 20, stiffness: 120, mass: 0.8 },
  soft: { damping: 24, stiffness: 90, mass: 1 },
  steady: { damping: 30, stiffness: 160, mass: 0.7 },
} as const;

export const timing = {
  instant: 80,
  fast: 160,
  normal: 260,
  slow: 420,
  breath: 800,
  drift: 1200,
} as const;
