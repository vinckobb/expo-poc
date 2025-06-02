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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

const themes: Record<ThemeName, ThemeDefinition> = {
  brand: {
    'light': vars({
      '--color-blue-100': '#eaf7ea',
      '--color-blue-150': '#d2f0d2',
      '--color-blue-200': '#a6e1a6',
      '--color-blue-300': '#6ccf6c',
      '--color-blue-400': '#2fad2f',
      '--color-blue-500': '#1f7a1f',
      '--color-blue-600': '#145214',
      '--color-green-100': '#feecec',
      '--color-green-150': '#fdd3d3',
      '--color-green-200': '#f9aaaa',
      '--color-green-300': '#f27878',
      '--color-green-400': '#ea3b3b',
      '--color-green-500': '#b32626',
      '--color-green-600': '#7a1818',
    }),
    'dark': vars({
      '--color-blue-100': '#feecec',
      '--color-blue-150': '#fdd3d3',
      '--color-blue-200': '#f9aaaa',
      '--color-blue-300': '#f27878',
      '--color-blue-400': '#ea3b3b',
      '--color-blue-500': '#b32626',
      '--color-blue-600': '#7a1818',
      '--color-green-100': '#eaf7ea',
      '--color-green-150': '#d2f0d2',
      '--color-green-200': '#a6e1a6',
      '--color-green-300': '#6ccf6c',
      '--color-green-400': '#2fad2f',
      '--color-green-500': '#1f7a1f',
      '--color-green-600': '#145214',
    })
  },
  christmas: {
    'light': vars({
      '--color-blue-100': '#fffbe6',
      '--color-blue-150': '#fff4c2',
      '--color-blue-200': '#ffe999',
      '--color-blue-300': '#ffd54d',
      '--color-blue-400': '#ffc107',
      '--color-blue-500': '#b38700',
      '--color-blue-600': '#806000',
      '--color-green-100': '#e6f0ff',
      '--color-green-150': '#c2dcff',
      '--color-green-200': '#99c2ff',
      '--color-green-300': '#4d99ff',
      '--color-green-400': '#0073ff',
      '--color-green-500': '#004db3',
      '--color-green-600': '#003380',
    }),
    'dark': vars({
      '--color-blue-100': '#e6f0ff',
      '--color-blue-150': '#c2dcff',
      '--color-blue-200': '#99c2ff',
      '--color-blue-300': '#4d99ff',
      '--color-blue-400': '#0073ff',
      '--color-blue-500': '#004db3',
      '--color-blue-600': '#003380',
      '--color-green-100': '#fffbe6',
      '--color-green-150': '#fff4c2',
      '--color-green-200': '#ffe999',
      '--color-green-300': '#ffd54d',
      '--color-green-400': '#ffc107',
      '--color-green-500': '#b38700',
      '--color-green-600': '#806000',
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