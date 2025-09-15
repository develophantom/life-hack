/**
 * Font configuration utilities for the app
 * Provides consistent font family names and utilities
 */

export const fonts = {
   regular: 'Lato_400Regular',
   bold: 'Lato_700Bold',
   black: 'Lato_900Black',
} as const;

export const fontWeights = {
   regular: '400',
   bold: '700',
   black: '900',
} as const;

/**
 * Get font family name for React Native Text style
 */
export const getFontFamily = (weight: keyof typeof fonts = 'regular') => {
   return fonts[weight];
};

/**
 * Get font weight value for React Native Text style
 */
export const getFontWeight = (weight: keyof typeof fontWeights = 'regular') => {
   return fontWeights[weight];
};

/**
 * Font style objects for React Native
 */
export const fontStyles = {
   regular: { fontFamily: fonts.regular },
   bold: { fontFamily: fonts.bold },
   black: { fontFamily: fonts.black },
} as const;
