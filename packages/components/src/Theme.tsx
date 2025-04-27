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
      '--color-primary-100': '234 247 234',
      '--color-primary-150': '210 240 210',
      '--color-primary-200': '166 225 166',
      '--color-primary-300': '108 207 108',
      '--color-primary-400': '47 173 47',
      '--color-primary-500': '31 122 31',
      '--color-primary-600': '20 82 20',
      '--color-secondary-100': '254 236 236',
      '--color-secondary-150': '253 211 211',
      '--color-secondary-200': '249 170 170',
      '--color-secondary-300': '242 120 120',
      '--color-secondary-400': '234 59 59',
      '--color-secondary-500': '179 38 38',
      '--color-secondary-600': '122 24 24',
    }),
    'dark': vars({
      '--color-primary-100': '254 236 236',
      '--color-primary-150': '253 211 211',
      '--color-primary-200': '249 170 170',
      '--color-primary-300': '242 120 120',
      '--color-primary-400': '234 59 59',
      '--color-primary-500': '179 38 38',
      '--color-primary-600': '122 24 24',
      '--color-secondary-100': '234 247 234',
      '--color-secondary-150': '210 240 210',
      '--color-secondary-200': '166 225 166',
      '--color-secondary-300': '108 207 108',
      '--color-secondary-400': '47 173 47',
      '--color-secondary-500': '31 122 31',
      '--color-secondary-600': '20 82 20',
    })
  },
  christmas: {
    'light': vars({
      '--color-primary-100': '255 251 230',
      '--color-primary-150': '255 244 194',
      '--color-primary-200': '255 233 153',
      '--color-primary-300': '255 213 77',
      '--color-primary-400': '255 193 7',
      '--color-primary-500': '179 135 0',
      '--color-primary-600': '128 96 0',
      '--color-secondary-100': '230 240 255',
      '--color-secondary-150': '194 220 255',
      '--color-secondary-200': '153 194 255',
      '--color-secondary-300': '77 153 255',
      '--color-secondary-400': '0 115 255',
      '--color-secondary-500': '0 77 179',
      '--color-secondary-600': '0 51 128',
    }),
    'dark': vars({
      '--color-primary-100': '230 240 255',
      '--color-primary-150': '194 220 255',
      '--color-primary-200': '153 194 255',
      '--color-primary-300': '77 153 255',
      '--color-primary-400': '0 115 255',
      '--color-primary-500': '0 77 179',
      '--color-primary-600': '0 51 128',
      '--color-secondary-100': '255 251 230',
      '--color-secondary-150': '255 244 194',
      '--color-secondary-200': '255 233 153',
      '--color-secondary-300': '255 213 77',
      '--color-secondary-400': '255 193 7',
      '--color-secondary-500': '179 135 0',
      '--color-secondary-600': '128 96 0',
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