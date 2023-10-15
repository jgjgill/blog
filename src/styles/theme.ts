export type ThemeColors = (typeof COLORS)[keyof typeof COLORS]

export const COLORS = {
  PURPLE300: '#d8b4fe',
  PURPLE500: '#c471f5',
  PURPLE700: '#7e22ce',
  FUCHSIA300: '#f0abfc',
  FUCHSIA500: '#d946ef',
  FUCHSIA700: '#a21caf',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#f7f7f7',
} as const

export const theme = {
  colors: {
    primary: {
      light: COLORS.PURPLE300,
      base: COLORS.PURPLE500,
      dark: COLORS.PURPLE700,
    },
    secondary: {
      light: COLORS.FUCHSIA300,
      base: COLORS.FUCHSIA500,
      dark: COLORS.FUCHSIA700,
    },
    black: COLORS.BLACK,
    white: COLORS.WHITE,
    gray: COLORS.GRAY,
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
  },
  fontWeight: {
    light: 300,
    medium: 500,
    bold: 700,
  },
}
