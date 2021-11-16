module.exports = {
  mode: process.env.NODE_ENV && 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  darkMode: false,
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        blue: 'var(--blue)',
        dark: 'var(--dark)',
        control: `var(--control)`,
        overlay: `rgba(0,0,0, 0.5)`,
      },
    },
  },
  variants: {},
  plugins: [],
};
