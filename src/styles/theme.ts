export type ThemeColors = (typeof COLORS)[keyof typeof COLORS]

export const COLORS = {
  PURPLE: '#c471f5',
  PINK: '#fa71cd',
  WHITE: '#ffffff',
  BLACK: '#000000',
} as const

export const theme = {
  colors: {
    primary: {
      base: COLORS.PURPLE,
    },
    secondary: {
      base: COLORS.PINK,
    },
    black: COLORS.BLACK,
    white: COLORS.WHITE,
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
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}
