import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
   const isDev = process.env.NODE_ENV === 'development';
   const isProd = process.env.NODE_ENV === 'production';

   return {
      ...config,
      name: isDev ? 'lifehack (Dev)' : 'lifehack',
      slug: 'lifehack-app',
      version: '1.0.0',
      scheme: 'lifehack-app',
      web: {
         bundler: 'metro',
         output: 'static',
         favicon: './assets/images/favicon.png',
      },
      plugins: [
         'expo-router',
         'expo-secure-store',
         'expo-web-browser',
         'expo-build-properties',
         'expo-font',
      ],
      experiments: {
         typedRoutes: true,
         tsconfigPaths: true,
      },
      newArchEnabled: true,
      orientation: 'portrait',
      icon: './assets/images/icon.png',
      userInterfaceStyle: 'light',
      splash: {
         image: './assets/images/splash.png',
         resizeMode: 'contain',
         backgroundColor: '#ffffff',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
         supportsTablet: true,
         bundleIdentifier: isDev
            ? 'com.develophantom.lifehack.dev'
            : 'com.develophantom.lifehack',
      },
      android: {
         adaptiveIcon: {
            foregroundImage: './assets/images/adaptive-icon.png',
            backgroundColor: '#ffffff',
         },
         package: isDev
            ? 'com.develophantom.lifehack.dev'
            : 'com.develophantom.lifehack',
      },
      extra: {
         router: {},
         eas: {
            projectId: '31021a0e-f568-4e75-b6b7-a47bb08b5623',
         },
         // Environment-specific configuration
         environment: process.env.NODE_ENV || 'development',
         apiUrl: isDev
            ? (process.env.EXPO_PUBLIC_SERVER_URL?.trim() || 'http://10.255.21.253:3000')
            : 'https://your-production-api.com',
         enableDevTools: isDev,
      },
      owner: 'thedevelophantom',
      // Development-specific configurations
      ...(isDev && {
         developmentClient: {
            silentLaunch: true,
         },
      }),
   };
};
