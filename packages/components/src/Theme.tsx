import { useColorScheme, vars } from "nativewind";
import { ReactNode } from "react";

import { View } from "./View";

// TODO move outside
type ColorScheme = 'light' | 'dark';
type ThemeName = 'brand' | 'christmas';

// Theme definition structure
interface ThemeDefinition {
  light: ReturnType<typeof vars<Record<`--${string}`, string | number>>>;
  dark: ReturnType<typeof vars<Record<`--${string}`, string | number>>>;
}

// Props for the Theme component
interface ThemeProps {
  name: ThemeName;
  children: ReactNode;
  style?: any;
}

const themes: Record<ThemeName, ThemeDefinition> = {
  brand: {
    'light': vars({
      '--color-primary-100': '#eaf7ea',
      '--color-primary-150': '#d2f0d2',
      '--color-primary-200': '#a6e1a6',
      '--color-primary-300': '#6ccf6c',
      '--color-primary-400': '#2fad2f',
      '--color-primary-500': '#1f7a1f',
      '--color-primary-600': '#145214',
      '--color-secondary-100': '#feecec',
      '--color-secondary-150': '#fdd3d3',
      '--color-secondary-200': '#f9aaaa',
      '--color-secondary-300': '#f27878',
      '--color-secondary-400': '#ea3b3b',
      '--color-secondary-500': '#b32626',
      '--color-secondary-600': '#7a1818',
    }),
    'dark': vars({
      '--color-primary-100': '#feecec',
      '--color-primary-150': '#fdd3d3',
      '--color-primary-200': '#f9aaaa',
      '--color-primary-300': '#f27878',
      '--color-primary-400': '#ea3b3b',
      '--color-primary-500': '#b32626',
      '--color-primary-600': '#7a1818',
      '--color-secondary-100': '#eaf7ea',
      '--color-secondary-150': '#d2f0d2',
      '--color-secondary-200': '#a6e1a6',
      '--color-secondary-300': '#6ccf6c',
      '--color-secondary-400': '#2fad2f',
      '--color-secondary-500': '#1f7a1f',
      '--color-secondary-600': '#145214',
    })
  },
  christmas: {
    'light': vars({
      '--color-primary-100': '#fffbe6',
      '--color-primary-150': '#fff4c2',
      '--color-primary-200': '#ffe999',
      '--color-primary-300': '#ffd54d',
      '--color-primary-400': '#ffc107',
      '--color-primary-500': '#b38700',
      '--color-primary-600': '#806000',
      '--color-secondary-100': '#e6f0ff',
      '--color-secondary-150': '#c2dcff',
      '--color-secondary-200': '#99c2ff',
      '--color-secondary-300': '#4d99ff',
      '--color-secondary-400': '#0073ff',
      '--color-secondary-500': '#004db3',
      '--color-secondary-600': '#003380',
    }),
    'dark': vars({
      '--color-primary-100': '#e6f0ff',
      '--color-primary-150': '#c2dcff',
      '--color-primary-200': '#99c2ff',
      '--color-primary-300': '#4d99ff',
      '--color-primary-400': '#0073ff',
      '--color-primary-500': '#004db3',
      '--color-primary-600': '#003380',
      '--color-secondary-100': '#fffbe6',
      '--color-secondary-150': '#fff4c2',
      '--color-secondary-200': '#ffe999',
      '--color-secondary-300': '#ffd54d',
      '--color-secondary-400': '#ffc107',
      '--color-secondary-500': '#b38700',
      '--color-secondary-600': '#806000',
    })
  }
}

export function Theme({ name, children, style }: ThemeProps) {
  const { colorScheme } = useColorScheme();
  
  return (
    <View style={[themes[name][colorScheme as ColorScheme], style]}>
      {children}
    </View>
  )
}

export default Theme;