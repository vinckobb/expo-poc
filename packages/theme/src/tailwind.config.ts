import type { Config } from "tailwindcss";

export function withTailwindConfig(content?: string[]): Config {
  return {
    darkMode: 'class',
    content: [
      "../../packages/**/*.{js,ts,jsx,tsx,mdx}",
      ...(content ?? [])
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        spacing: {
          '0.625': '0.625rem', // 10px
          '1.5': '1.5rem', // 24px
        },
        colors: {
          blue: {
            100: 'var(--color-blue-100)',
            150: 'var(--color-blue-150)',
            200: 'var(--color-blue-200)',
            300: 'var(--color-blue-300)',
            400: 'var(--color-blue-400)',
            500: 'var(--color-blue-500)',
            dark: 'var(--color-blue-dark)',
          },
          red: {
            50: 'var(--color-red-50)',
            100: 'var(--color-red-100)',
            200: 'var(--color-red-200)',
            300: 'var(--color-red-300)',
            400: 'var(--color-red-400)',
            500: 'var(--color-red-500)',
            600: 'var(--color-red-600)',
            700: 'var(--color-red-700)',
            800: 'var(--color-red-800)',
            900: 'var(--color-red-900)',
            950: 'var(--color-red-950)',
          },
          green: {
            50: 'var(--color-green-50)',
            100: 'var(--color-green-100)',
            200: 'var(--color-green-200)',
            300: 'var(--color-green-300)',
            400: 'var(--color-green-400)',
            500: 'var(--color-green-500)',
            600: 'var(--color-green-600)',
            700: 'var(--color-green-700)',
            800: 'var(--color-green-800)',
            900: 'var(--color-green-900)',
            950: 'var(--color-green-950)',
          },
          positive: 'var(--color-positive)',
          'green-alpha': {
            50: 'var(--color-green-alpha-50)',
            100: 'var(--color-green-alpha-100)',
            200: 'var(--color-green-alpha-200)',
            300: 'var(--color-green-alpha-300)',
          },
          'blue-alpha': {
            50: 'var(--color-blue-alpha-50)',
            100: 'var(--color-blue-alpha-100)',
            200: 'var(--color-blue-alpha-200)',
            300: 'var(--color-blue-alpha-300)',
          },
          'orange-alpha': {
            50: 'var(--color-orange-alpha-50)',
            100: 'var(--color-orange-alpha-100)',
            200: 'var(--color-orange-alpha-200)',
            300: 'var(--color-orange-alpha-300)',
          },
          'pink-alpha': {
            50: 'var(--color-pink-alpha-50)',
            100: 'var(--color-pink-alpha-100)',
            200: 'var(--color-pink-alpha-200)',
            300: 'var(--color-pink-alpha-300)',
          },
          neutral: {
            90: 'var(--color-neutral-90)',
            100: 'var(--color-neutral-100)',
            200: 'var(--color-neutral-200)',
            300: 'var(--color-neutral-300)',
            400: 'var(--color-neutral-400)',
            500: 'var(--color-neutral-500)',
            600: 'var(--color-neutral-600)',
            700: 'var(--color-neutral-700)',
            800: 'var(--color-neutral-800)',
            900: 'var(--color-neutral-900)',
          },
          'grey-blue': {
            50: 'var(--color-grey-blue-50)',
            100: 'var(--color-grey-blue-100)',
            200: 'var(--color-grey-blue-200)',
            300: 'var(--color-grey-blue-300)',
            400: 'var(--color-grey-blue-400)',
            500: 'var(--color-grey-blue-500)',
            600: 'var(--color-grey-blue-600)',
            700: 'var(--color-grey-blue-700)',
            800: 'var(--color-grey-blue-800)',
            900: 'var(--color-grey-blue-900)',
            950: 'var(--color-grey-blue-950)',
          }
        }
      }
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ addBase }: any) =>
        addBase({
          ":root": {
            '--color-blue-100': '#eff5fe', 
            '--color-blue-150': '#E0ECFE', 
            '--color-blue-200': '#c3d9f9', 
            '--color-blue-300': '#88b3f6', 
            '--color-blue-400': '#126dff', 
            '--color-blue-500': '#0b4199', 
            '--color-blue-dark': '#072c66', 

            '--color-red-50': '#fbeef0', 
            '--color-red-100': '#fde6e7', 
            '--color-red-200': '#fbd0d3', 
            '--color-red-300': '#f8b5b9', 
            '--color-red-400': '#f27a84', 
            '--color-red-500': '#e84b5c', 
            '--color-red-600': '#d42a44', 
            '--color-red-700': '#c3112b', 
            '--color-red-800': '#A21227', 
            '--color-red-900': '#861626', 
            '--color-red-950': '#490610', 

            '--color-green-50': '#F3FAF3', 
            '--color-green-100': '#ebf5ec', 
            '--color-green-200': '#C8EACB', 
            '--color-green-300': '#9FDAA5', 
            '--color-green-400': '#69BF72', 
            '--color-green-500': '#44A34E', 
            '--color-green-600': '#34853D', 
            '--color-green-700': '#2C6933', 
            '--color-green-800': '#27542C', 
            '--color-green-900': '#214626', 
            '--color-green-950': '#0e2511', 

            '--color-positive': '#078814',

            '--color-green-alpha-50': '#EDFCF7', 
            '--color-green-alpha-100': '#C4F5E2', 
            '--color-green-alpha-200': '#ABEFD8', 
            '--color-green-alpha-300': '#75E0C3', 

            '--color-blue-alpha-50': '#EFF5FF', 
            '--color-blue-alpha-100': '#E3EDFF', 
            '--color-blue-alpha-200': '#BDD6FF', 
            '--color-blue-alpha-300': '#90BDFF', 

            '--color-orange-alpha-50': '#FEF5F2', 
            '--color-orange-alpha-100': '#FFE7DE', 
            '--color-orange-alpha-200': '#ffd7c8', 
            '--color-orange-alpha-300': '#FFBBA2', 

            '--color-pink-alpha-50': '#FFF4FE', 
            '--color-pink-alpha-100': '#FFE7FE', 
            '--color-pink-alpha-200': '#FFD7FC', 
            '--color-pink-alpha-300': '#FEA9F4',

            '--color-neutral-90': '#fafafa',
            '--color-neutral-100': '#f5f5f5',
            '--color-neutral-200': '#eeeeee',
            '--color-neutral-300': '#e0e0e0',
            '--color-neutral-400': '#bdbdbd',
            '--color-neutral-500': '#9e9e9e',
            '--color-neutral-600': '#757575',
            '--color-neutral-700': '#616161',
            '--color-neutral-800': '#424242',
            '--color-neutral-900': '#020D1F',

            '--color-grey-blue-50': '#F4F7F9',
            '--color-grey-blue-100': '#EBF0F4',
            '--color-grey-blue-200': '#DBE3EA',
            '--color-grey-blue-300': '#C5D1DC',
            '--color-grey-blue-400': '#ADBBCC',
            '--color-grey-blue-500': '#8C9CB6',
            '--color-grey-blue-600': '#808CAB',
            '--color-grey-blue-700': '#6D7895',
            '--color-grey-blue-800': '#5A6379',
            '--color-grey-blue-900': '#313D50',
            '--color-grey-blue-950': '#1A273D',
          },
        }),
    ],
  } satisfies Config;
};
