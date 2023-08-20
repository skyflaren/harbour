import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Rowdies", "sans-serif"],
        serif: ["Mate", "serif"],
        sans: ["Assistant", "sans-serif"]
      },
      colors: {
        'text': '#1c1c18',
        'background': '#efede6',
        'primary': '#5dc8b9',
        'secondary': '#d8c5c5',
        'tertiary': '#c4b3b3',
        'accent': '#348aa4',
        'danger': '#f2bbbb',
        'water': `#1b3440`,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
