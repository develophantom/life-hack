# Using dom-components in Expo
_Exported on 9/11/2025 at 02:22:25 GMT from Cursor (1.5.11)_

---

**User**

@https://docs.expo.dev/guides/dom-components/ how could we use this dom-components

---

**Cursor**

Based on the Expo DOM components documentation, this is a powerful feature that allows you to render React DOM components directly inside React Native apps using the `'use dom'` directive. Here's how you could use it in your hack-life project:

## What DOM Components Enable

DOM components let you:
- Use standard web technologies (`<div>`, `<img>`, CSS, etc.) inside React Native apps
- Incrementally migrate web components to native apps
- Access web APIs and libraries that aren't available in React Native
- Build hybrid apps with both native and web content

## Key Use Cases for Your Project

### 1. **Rich Text Content**
```typescript
// components/rich-text-content.tsx
'use dom';

export default function RichTextContent({ content }: { content: string }) {
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
```

### 2. **Web-based Forms**
```typescript
// components/web-form.tsx
'use dom';

export default function WebForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await onSubmit(Object.fromEntries(formData));
    }}>
      <input name="title" placeholder="Title" />
      <textarea name="description" placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 3. **Data Visualization**
```typescript
// components/chart.tsx
'use dom';

export default function Chart({ data }: { data: any[] }) {
  return (
    <div>
      <canvas id="chart" width="400" height="300"></canvas>
      {/* Use Chart.js, D3, or other web charting libraries */}
    </div>
  );
}
```

## Implementation in Your Native App

### 1. **Install Required Dependencies**
```bash
bun add react-native-webview
bun add @expo/metro-runtime react-dom react-native-web
```

### 2. **Use DOM Components in Native Screens**
```typescript
// apps/native/src/screens/WebContentScreen.tsx
import { View } from 'react-native';
import RichTextContent from '../../components/rich-text-content';

export default function WebContentScreen() {
  return (
    <View style={{ flex: 1 }}>
      <RichTextContent 
        content="<h1>Hello from DOM!</h1><p>This is rendered using web technologies.</p>"
      />
    </View>
  );
}
```

### 3. **Pass Data Between Native and DOM**
```typescript
// Native side
<WebForm 
  onSubmit={async (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  }}
  dom={{ scrollEnabled: false }}
/>
```

## Advanced Features

### **Native Actions** - Call Native Functions from DOM
```typescript
// Native component
<DOMComponent 
  saveData={async (data: any) => {
    // Save to native storage
    await AsyncStorage.setItem('data', JSON.stringify(data));
  }}
  getLocation={async () => {
    // Get native location
    return await Location.getCurrentPositionAsync();
  }}
/>
```

### **Dynamic Sizing**
```typescript
// Auto-resize based on content
<DOMComponent dom={{ matchContents: true }} />

// Or manual sizing
<DOMComponent 
  dom={{ 
    style: { width: 300, height: 200 } 
  }} 
/>
```

## Best Practices for Your Project

1. **Use for Specific Use Cases**: Rich text, complex forms, data visualization, or web-specific features
2. **Keep Native for Core UI**: Use native components for navigation, basic UI, and performance-critical parts
3. **Handle Data Flow**: Use props and native actions for communication between native and DOM components
4. **Consider Performance**: DOM components are slower than native views, so use them judiciously

## Example Integration

Here's how you might integrate this into your hack-life project:

```typescript
// apps/native/src/screens/ArticleScreen.tsx
import { View, ScrollView } from 'react-native';
import ArticleContent from '../../components/article-content';

export default function ArticleScreen({ route }) {
  const { article } = route.params;
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <ArticleContent 
        content={article.htmlContent}
        onLinkPress={async (url) => {
          // Handle link navigation
          await Linking.openURL(url);
        }}
        dom={{ matchContents: true }}
      />
    </ScrollView>
  );
}
```

```typescript
// apps/native/src/components/article-content.tsx
'use dom';

export default function ArticleContent({ 
  content, 
  onLinkPress 
}: { 
  content: string;
  onLinkPress: (url: string) => Promise<void>;
}) {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={(e) => {
          const link = e.target.closest('a');
          if (link) {
            e.preventDefault();
            onLinkPress(link.href);
          }
        }}
      />
    </div>
  );
}
```

This approach gives you the flexibility to use web technologies where they make sense while keeping the core app experience native and performant.

```typescript
// components/rich-text-content.tsx
'use dom';

export default function RichTextContent({ content }: { content: string }) {
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui' }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
```

```typescript
// components/web-form.tsx
'use dom';

export default function WebForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await onSubmit(Object.fromEntries(formData));
    }}>
      <input name="title" placeholder="Title" />
      <textarea name="description" placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

```typescript
// components/chart.tsx
'use dom';

export default function Chart({ data }: { data: any[] }) {
  return (
    <div>
      <canvas id="chart" width="400" height="300"></canvas>
      {/* Use Chart.js, D3, or other web charting libraries */}
    </div>
  );
}
```

```shellscript
bun add react-native-webview
bun add @expo/metro-runtime react-dom react-native-web
```

```typescript
// apps/native/src/screens/WebContentScreen.tsx
import { View } from 'react-native';
import RichTextContent from '../../components/rich-text-content';

export default function WebContentScreen() {
  return (
    <View style={{ flex: 1 }}>
      <RichTextContent 
        content="<h1>Hello from DOM!</h1><p>This is rendered using web technologies.</p>"
      />
    </View>
  );
}
```

```typescript
// Native side
<WebForm 
  onSubmit={async (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  }}
  dom={{ scrollEnabled: false }}
/>
```

```typescript
// Native component
<DOMComponent 
  saveData={async (data: any) => {
    // Save to native storage
    await AsyncStorage.setItem('data', JSON.stringify(data));
  }}
  getLocation={async () => {
    // Get native location
    return await Location.getCurrentPositionAsync();
  }}
/>
```

```typescript
// Auto-resize based on content
<DOMComponent dom={{ matchContents: true }} />

// Or manual sizing
<DOMComponent 
  dom={{ 
    style: { width: 300, height: 200 } 
  }} 
/>
```

```typescript
// apps/native/src/screens/ArticleScreen.tsx
import { View, ScrollView } from 'react-native';
import ArticleContent from '../../components/article-content';

export default function ArticleScreen({ route }) {
  const { article } = route.params;
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <ArticleContent 
        content={article.htmlContent}
        onLinkPress={async (url) => {
          // Handle link navigation
          await Linking.openURL(url);
        }}
        dom={{ matchContents: true }}
      />
    </ScrollView>
  );
}
```

```typescript
// apps/native/src/components/article-content.tsx
'use dom';

export default function ArticleContent({ 
  content, 
  onLinkPress 
}: { 
  content: string;
  onLinkPress: (url: string) => Promise<void>;
}) {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={(e) => {
          const link = e.target.closest('a');
          if (link) {
            e.preventDefault();
            onLinkPress(link.href);
          }
        }}
      />
    </div>
  );
}
```

