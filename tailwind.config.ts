import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist:[
    {
      pattern: /^grid-cols-/,
      variants: ['sm','md','lg','xl','2xl'],
    }
  ],
  theme: {
    extend: {
      colors: {
        balada_gray_600: "#2b2a33",
        balada_gray_800: "#1c1b22",
        balada_gray_900: "#111115",
        balada_blue_800: "#000120",
        balada_green_800: "#0bd971",
        balada_green_900: "#0bab5a",
        balada_violet_500: "#3636ff",
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
