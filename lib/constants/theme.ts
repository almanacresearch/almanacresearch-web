// Brand Colors
export const colors = {
  primary: {
    darkBrown: "#78523E",
    mediumBrown: "#92664F",
    lightBrown: "#A0725D",
    gold: "#C4A57B",
  },
  background: {
    cream: "#f5ede1",
    offWhite: "#faf8f5",
    white: "#FAF9F7",
  },
  stone: {
    900: "#44403c",
    800: "#57534e",
    700: "#78716c",
    600: "#a8a29e",
    500: "#d6d3d1",
    400: "#e7e5e4",
    200: "#e5e7eb",
  },
} as const;

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary.darkBrown} 0%, ${colors.primary.mediumBrown} 50%, ${colors.primary.lightBrown} 100%)`,
  hero: `linear-gradient(135deg, ${colors.primary.darkBrown} 0%, ${colors.primary.gold} 100%)`,
  heroAlt: `linear-gradient(135deg, ${colors.primary.mediumBrown} 0%, ${colors.primary.gold} 100%)`,
  background: `linear-gradient(180deg, ${colors.background.offWhite} 0%, #ffffff 50%, ${colors.background.cream} 100%)`,
  heroBackground: `linear-gradient(180deg, ${colors.background.offWhite} 0%, ${colors.background.cream} 100%)`,
  glass: `linear-gradient(135deg, rgba(245, 237, 225, 0.5) 0%, rgba(250, 246, 239, 0.6) 50%, rgba(245, 237, 225, 0.4) 100%)`,
  glassReflection: `linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%, rgba(196, 165, 123, 0.2) 100%)`,
  glassShimmer: `linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)`,
  glassBorder: `linear-gradient(145deg, rgba(255, 255, 255, 0.8), transparent 30%, transparent 70%, rgba(146, 102, 79, 0.3))`,
  radialGold: `radial-gradient(circle, ${colors.primary.gold}, transparent)`,
  radialGoldFade: `radial-gradient(circle, ${colors.primary.gold} 0%, transparent 70%)`,
  radialBrown: `radial-gradient(circle, ${colors.primary.mediumBrown}, transparent)`,
  radialBrownFade: `radial-gradient(circle, ${colors.primary.mediumBrown} 0%, transparent 70%)`,
  radialLightBrown: `radial-gradient(circle, ${colors.primary.lightBrown} 0%, transparent 70%)`,
  divider: {
    toBottom: `linear-gradient(to bottom, ${colors.primary.darkBrown}, ${colors.primary.gold})`,
    toBottomAlt1: `linear-gradient(to bottom, ${colors.primary.mediumBrown}, ${colors.primary.gold})`,
    toBottomAlt2: `linear-gradient(to bottom, ${colors.primary.lightBrown}, ${colors.primary.gold})`,
    toBottomAlt3: `linear-gradient(to bottom, ${colors.primary.darkBrown}, ${colors.primary.mediumBrown})`,
  },
} as const;

// Shadows
export const shadows = {
  glass:
    "0 8px 32px 0 rgba(120, 82, 62, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(146, 102, 79, 0.1)",
  button: "0 10px 30px rgba(120, 82, 62, 0.4)",
  card: "0 20px 60px rgba(120, 82, 62, 0.3)",
} as const;

// Helper function to get rgba color
export const rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
