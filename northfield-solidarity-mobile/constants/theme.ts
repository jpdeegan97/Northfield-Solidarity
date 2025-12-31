/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';



export const Colors = {
  // Default light/dark (mapped to Northfield/Sanctum logically in _layout)
  light: {
    text: '#ffffff',
    background: '#0052cc',
    tint: '#ffffff',
    icon: '#cccccc',
    tabIconDefault: '#cccccc',
    tabIconSelected: '#ffffff',
    brand: '#ffffff',
    surface: '#0042a4',
    border: '#3378e0',
  },
  dark: {
    text: '#ecedee',
    background: '#000000', // Pitch black for Sanctum
    tint: '#00ff9d', // Sanctum Green
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#00ff9d',
    brand: '#00ff9d',
    surface: '#111111',
    border: '#333333',
  },
  // Specific Theme Definitions
  innerSanctum: {
    text: '#ecedee',
    background: '#000000',
    tint: '#00ff9d',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#00ff9d',
    brand: '#00ff9d',
    surface: '#111111',
    border: '#333333',
  },
  northfield: {
    text: '#ffffff',
    background: '#0052cc',
    tint: '#ffffff',
    icon: '#cccccc',
    tabIconDefault: '#cccccc',
    tabIconSelected: '#ffffff',
    brand: '#ffffff',
    surface: '#0042a4',
    border: '#3378e0',
  }
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
