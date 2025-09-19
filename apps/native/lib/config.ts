import Constants from 'expo-constants';

export interface AppConfig {
   environment: 'development' | 'production';
   apiUrl: string;
   enableDevTools: boolean;
   appName: string;
   bundleIdentifier: string;
}

const getConfig = (): AppConfig => {
   const isDev = process.env.NODE_ENV === 'development';
   const extra = Constants.expoConfig?.extra as any;

   return {
      environment: (extra?.environment || process.env.NODE_ENV || 'development') as 'development' | 'production',
      apiUrl: (isDev ? (process.env.EXPO_PUBLIC_SERVER_URL?.trim() || 'http://10.255.21.253:3000') : 'https://your-production-api.com'),
      enableDevTools: extra?.enableDevTools ?? isDev,
      appName: isDev ? 'lifehack (Dev)' : 'lifehack',
      bundleIdentifier: isDev
         ? 'com.develophantom.lifehack.dev'
         : 'com.develophantom.lifehack',
   };
};

export const config = getConfig();

// Debug logging
if (process.env.NODE_ENV === 'development') {
   console.log('Config debug:', {
      environment: config.environment,
      apiUrl: config.apiUrl,
      rawEnvVar: process.env.EXPO_PUBLIC_SERVER_URL,
      trimmedEnvVar: process.env.EXPO_PUBLIC_SERVER_URL?.trim(),
      extraApiUrl: Constants.expoConfig?.extra?.apiUrl,
      isDev: process.env.NODE_ENV === 'development',
   });
}

// Helper functions for environment checks
export const isDevelopment = () => config.environment === 'development';
export const isProduction = () => config.environment === 'production';

// API configuration
export const getApiUrl = () => config.apiUrl;

// Development tools
export const shouldEnableDevTools = () => config.enableDevTools;
