/**
 * Creates different opacity variants for provided color
 *
 * @param color CSS Variable name without double dash
 */
const withOpacity = (color) => {
  return Array.from({ length: 9 }).reduce(
    (prev, _cur, i) => ({
      ...prev,
      [(i + 1) * 10]: `var(--${color}-${(i + 1) * 10})`,
    }),
    {}
  );
};

module.exports = {
  mode: process.env.NODE_ENV && 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
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
      // Inset borders using to ensure that component have same dimensions
      boxShadow: {
        'border-blue': `inset 0 0 0 2px var(--blue);`,
        'border-darkblue': `inset 0 0 0 2px var(--darkblue);`,
        'border-red': `inset 0 0 0 2px var(--red);`,
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: 0,
            backgroundImage:
              'linear-gradient(90deg, #dddddd 0px, #e8e8e8 40px, #dddddd 80px)',
            backgroundSize: '400px',
          },
          '100%': {
            backgroundPosition: '400px',
            backgroundImage:
              'linear-gradient(90deg, #dddddd 0px, #e8e8e8 40px, #dddddd 80px)',
            backgroundSize: '400px',
          },
        },
      },
      animation: {
        shine: 'shine 2.4s infinite linear',
      },
      colors: {
        blue: {
          DEFAULT: `var(--blue)`,
        },
        darkblue: {
          DEFAULT: 'var(--darkblue)',
        },
        dark: {
          DEFAULT: 'var(--dark)',
          ...withOpacity('dark'),
        },
        violet: {
          DEFAULT: 'var(--violet)',
          ...withOpacity('violet'),
        },
        red: {
          DEFAULT: 'var(--red)',
        },
        green: {
          DEFAULT: 'var(--green)',
        },

        gray: 'var(--gray)',

        control: `var(--control)`,
        overlay: `rgba(0,0,0, 0.5)`,
      },
    },
  },
  variants: {},
  plugins: [],
};
