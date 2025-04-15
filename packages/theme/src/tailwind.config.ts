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
        colors: {
          primary: {
            100: 'var(--color-primary-100)',
            150: 'var(--color-primary-150)',
            200: 'var(--color-primary-200)',
            300: 'var(--color-primary-300)',
            400: 'var(--color-primary-400)',
            500: 'var(--color-primary-500)',
            600: 'var(--color-primary-600)',
          },
          secondary: {
            100: 'var(--color-secondary-100)',
            200: 'var(--color-secondary-200)',
            300: 'var(--color-secondary-300)',
            400: 'var(--color-secondary-400)',
            500: 'var(--color-secondary-500)',
            600: 'var(--color-secondary-600)',
          },
          error: {
            100: 'var(--color-error-100)',
            200: 'var(--color-error-200)',
            300: 'var(--color-error-300)',
          },
          success: {
            100: 'var(--color-success-100)',
            200: 'var(--color-success-200)',
            300: 'var(--color-success-300)',
          }
        }
      }
    },
    plugins: [
      ({ addBase }: any) =>
        addBase({
          ":root": {
            '--color-primary-100': '#eff5fe', 
            '--color-primary-150': '#E0ECFE', 
            '--color-primary-200': '#c3d9f9', 
            '--color-primary-300': '#88b3f6', 
            '--color-primary-400': '#126dff', 
            '--color-primary-500': '#0b4199', 
            '--color-primary-600': '#072c66',
            '--color-secondary-100': '#e8e8e8', 
            '--color-secondary-200': '#b8b8b8', 
            '--color-secondary-300': '#8f8f8f', 
            '--color-secondary-400': '#595959', 
            '--color-secondary-500': '#3a3a3a', 
            '--color-secondary-600': '#262626', 
            '--color-error-100': '#fbeef0', 
            '--color-error-300': '#f8b5b9', 
            '--color-error-500': '#c3112b', 
            '--color-success-100': '#ebf5ec', 
            '--color-success-300': '#9fdaa5', 
            '--color-success-500': '#078814',
          },
        }),
    ],
  } satisfies Config;
};
