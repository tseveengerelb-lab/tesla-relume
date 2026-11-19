/**
 * Motion tokens. Entrances use an expo-out curve: fast start, long soft landing,
 * so content arrives quickly and settles calmly. Hover and colour changes keep
 * the CSS ease-tesla curve.
 */
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const duration = {
  /** Text, cards, small blocks. */
  enter: 0.8,
  /** Large photos. */
  media: 1.2,
};

/** Delay between siblings in a staggered group (seconds). */
export const stagger = 0.08;

/** Start once 15% of the element is on screen, and only the first time. */
export const inView = { once: true, amount: 0.15 } as const;
