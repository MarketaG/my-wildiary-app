/**
 * =========================
 * NAVIGATION
 * =========================
 */

export type HeaderProps = {
  t: (key: string) => string;
  locale: string;
  theme?: string;
  isActive: (href: string) => boolean;
  switchLanguage: (locale: "cs" | "en") => void;
  toggleTheme: () => void;
};

export type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
};

export type NavIconProps = {
  children?: React.ReactNode;
  icon: React.ElementType;
  href?: string;
  tooltip: string;
  onClick?: () => void;
  className?: string;
};

export type SearchBarProps = {
  placeholder: string;
  icon?: React.ElementType;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
};

/**
 * =========================
 * SECTIONS
 * =========================
 */

export type Observation = {
  _id: string;
  title: string;
  description: string;
  habitat?: string;
  weather?: string;
  created_at: string;
  image_url?: string;
  animal?: {
    _id: string;
    commonName: string;
    species: string;
  };
  user?: {
    _id: string;
    name: string;
  };
};

export type MinimalObservation = {
  _id: string;
  title: string;
  description: string;
  coords: [number, number];
  animal: {
    commonName: string;
  };
};

/**
 * =========================
 * UI
 * =========================
 */
