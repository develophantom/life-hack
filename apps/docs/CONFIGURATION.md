# Configuration System

This document explains how to use the TypeScript-based configuration system for different environments (development and production).

## Overview

The app has been converted from JSON to TypeScript configuration to support different build environments. This allows you to have separate configurations for development and production builds.

## Files Changed

- `app.json` → `app.config.ts` (converted to TypeScript)
- `eas.json` (updated with environment variables)
- `package.json` (updated scripts)
- `lib/config.ts` (new configuration helper)

## Environment Configuration

### Development Environment

- **App Name**: "lifehack (Dev)"
- **Bundle ID**: `com.develophantom.lifehack.dev`
- **API URL**: `http://localhost:3000`
- **Dev Tools**: Enabled

### Production Environment

- **App Name**: "lifehack"
- **Bundle ID**: `com.develophantom.lifehack`
- **API URL**: `https://your-production-api.com`
- **Dev Tools**: Disabled

## Usage

### Running Development Build

```bash
# Start development server
bun run dev

# Build development APK
bun run build:dev
```

### Running Production Build

```bash
# Build preview APK
bun run build:preview

# Build production AAB
bun run build:prod
```

### Using Configuration in Code

```typescript
import { config, isDevelopment, getApiUrl } from '@/lib/config';

// Check environment
if (isDevelopment()) {
  console.log('Running in development mode');
}

// Get API URL
const apiUrl = getApiUrl();

// Access full config
console.log('Current environment:', config.environment);
console.log('API URL:', config.apiUrl);
```

## Environment Variables

The configuration system uses `NODE_ENV` to determine the environment:

- `NODE_ENV=development` → Development configuration
- `NODE_ENV=production` → Production configuration

## EAS Build Profiles

### Development Profile

- Development client enabled
- Internal distribution
- APK build type
- iOS simulator support

### Preview Profile

- Production environment variables
- Internal distribution
- APK build type
- Release gradle command

### Production Profile

- Production environment variables
- AAB build type for Play Store

## Customization

To modify the configuration:

1. **API URLs**: Update `lib/config.ts` or `app.config.ts`
2. **Bundle Identifiers**: Modify the bundle ID logic in `app.config.ts`
3. **App Names**: Change the app name logic in `app.config.ts`
4. **Additional Environment Variables**: Add them to `eas.json` and access via `Constants.expoConfig.extra`

## Benefits

- **Type Safety**: Full TypeScript support for configuration
- **Environment Separation**: Clear separation between dev and prod
- **Flexibility**: Easy to add new environments or modify existing ones
- **Build Optimization**: Different build settings for different environments
