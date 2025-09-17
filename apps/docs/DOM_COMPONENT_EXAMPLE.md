# DOM Component Implementation Example

This document shows a working example of using Expo's DOM components feature in the hack-life application.

## What We Built

### DOM Component with `'use dom'` Directive

**File**: `apps/native/components/ui/motivational-quote-dom.tsx`

```typescript
'use dom';

import React from 'react';

export default function MotivationalQuoteDOM({ quote, author, onRefresh }) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      // ... more CSS styles
    }}
    onClick={onRefresh}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    >
      {/* Animated background pattern */}
      <div style={{
        animation: 'float 20s infinite linear',
        // ... animation styles
      }} />
      
      <style>{`
        @keyframes float {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-20px) translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
```

## Key Features Demonstrated

### 1. **`'use dom'` Directive**
- Must be the first line in the file
- Tells Expo to render this component using web technologies

### 2. **CSS Animations**
- CSS keyframe animations (`@keyframes float`)
- Smooth transitions and transforms
- Hover effects with `onMouseEnter`/`onMouseLeave`

### 3. **Web Styling**
- CSS gradients (`linear-gradient`)
- Box shadows and border radius
- Web fonts (`system-ui, -apple-system`)
- Full CSS styling capabilities

### 4. **Interactive Elements**
- Click handlers (`onClick`)
- Mouse events (`onMouseEnter`, `onMouseLeave`)
- Dynamic style changes

### 5. **Integration with React Native**
- Props passed from React Native components
- State management with React hooks
- TypeScript interfaces for type safety

## Integration Example

**File**: `apps/native/app/(dashboard)/index.tsx`

```typescript
import MotivationalQuoteDOM from "@/components/ui/motivational-quote-dom";
import { getRandomQuote } from "@/lib/motivational-quotes-dom";

export default function DashboardScreen() {
  const [domQuote, setDomQuote] = React.useState(getRandomQuote());

  return (
    <Container>
      {/* DOM Component Integration */}
      <MotivationalQuoteDOM
        quote={domQuote.quote}
        author={domQuote.author}
        onRefresh={() => setDomQuote(getRandomQuote())}
      />
    </Container>
  );
}
```

## Required Dependencies

To use DOM components, install these packages:

```bash
bun add react-native-webview @expo/metro-runtime react-dom react-native-web
```

## Benefits of This Approach

1. **Rich Styling**: Access to full CSS capabilities
2. **Web Standards**: Use familiar web technologies
3. **Performance**: Optimized rendering within React Native
4. **Type Safety**: Full TypeScript support
5. **Interactive**: Rich user interactions with hover effects
6. **Maintainable**: Clean separation of concerns

## Files Created

- `apps/native/components/ui/motivational-quote-dom.tsx` - DOM component
- `apps/native/lib/motivational-quotes-dom.ts` - Data and utilities
- `apps/native/app/(dashboard)/index.tsx` - Integration point

This implementation demonstrates how DOM components can enhance React Native apps with web technologies while maintaining performance and type safety.
