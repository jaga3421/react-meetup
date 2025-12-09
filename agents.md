# Tech Talk Presentation Template - Agent Guide

## Overview

This is a Next.js-based presentation template designed for tech talks and presentations. The app uses a vertical scrolling layout with CSS snap points, allowing smooth navigation between slides using arrow keys or scroll gestures.

## Architecture

### Core Structure

- **`app/page.js`**: Main presentation page that imports data and renders slide components
- **`app/data.js`**: Central data file containing all presentation content organized as an object with named keys
- **`app/slides/`**: Directory containing all slide component templates
- **`app/components/`**: Reusable UI components used across slides

### Key Features

- **Vertical Snap Scrolling**: Each slide is a full-screen section with CSS `snap-y snap-mandatory`
- **Keyboard Navigation**: Press arrow keys (down/up) to navigate between slides
- **Animation**: Uses Framer Motion and react-intersection-observer for smooth animations
- **Timer Component**: Built-in timer in the top-right corner for presentation timing
- **Responsive Design**: Works across different screen sizes

## Slide Components

### 1. Intro (`Intro.jsx`)

**Purpose**: First slide with title, author info, and social links

**Data Structure**:
```javascript
intro: {
  title: "Presentation Title",
  author: "Author Name, Title, Company",
  social: [
    {
      icon: "FaLinkedin", // Icon name from react-icons
      content: "/in/username",
      url: "https://www.linkedin.com/in/username"
    },
    // ... more social links
  ]
}
```

**Usage in page.js**:
```jsx
<Intro data={data.intro} />
```

**Features**:
- Animated title with TypeAnimation
- Author image display
- Social media links with icons

---

### 2. SingleList (`SingleList.jsx`)

**Purpose**: Display a title with a vertical list of items (e.g., agenda, topics)

**Data Structure**:
```javascript
agenda: {
  id: "agenda", // Optional: for anchor links
  title: "Talk Agenda",
  subtitles: [
    "Item 1",
    "Item 2",
    "Item 3",
    // ... more items
  ]
}
```

**Usage in page.js**:
```jsx
<SingleList data={data.agenda} />
```

**Features**:
- Staggered animation for list items
- Chevron icons for each item
- Left-aligned text layout

---

### 3. HorizandalLarge (`HorizandalLarge.jsx`)

**Purpose**: Horizontal scrolling slides with multiple sub-slides. Supports text lists, images, and code blocks.

**Data Structure**:
```javascript
whatIsOfflineFirst: {
  id: "whatIsOfflineFirst",
  title: "Main Title",
  horizandalSubSlides: [
    {
      title: "Sub-slide Title",
      list: [
        {
          title: "Item Title",
          content: "Item description text"
        },
        // ... more list items
      ]
    },
    {
      title: "Another Sub-slide",
      image: "https://example.com/image.png", // Optional: image URL
      list: [
        // ... list items
      ]
    },
    {
      title: "Code Example",
      code: "// Your code here\nconst example = 'code';", // Optional: code block
      language: "javascript", // Optional: code language
      list: [
        // ... list items
      ]
    }
  ]
}
```

**Usage in page.js**:
```jsx
<HorizandalLarge data={data.whatIsOfflineFirst} />
```

**Features**:
- Horizontal scrolling within the slide
- Each sub-slide is 95% width with snap scrolling
- Supports:
  - Text lists with title/content pairs
  - Images (40% width, right side)
  - Code blocks with syntax highlighting (40% width, right side)
- When image or code is present, content area is 60% width

---

### 4. HorizandalSmall (`HorizandalSmall.jsx`)

**Purpose**: Horizontal layout with multiple small cards side-by-side (typically 4 cards)

**Data Structure**:
```javascript
usefulLibraries: {
  id: "usefulLibraries",
  title: "Useful Libraries",
  horizandalSubSlides: [
    {
      title: "Library Name",
      content: "Description of the library and its purpose.",
      image: "https://example.com/logo.png", // Optional
      example: "example1,example2,example3", // Optional: comma-separated tags
      link: "https://example.com" // Optional: link URL
    },
    // ... more cards (typically 4 total)
  ]
}
```

**Usage in page.js**:
```jsx
<HorizandalSmall data={data.usefulLibraries} />
```

**Features**:
- Cards displayed in a row (each takes 1/4 width)
- Simple content display
- Optional image, example tags, and links

---

### 5. DemoLink (`DemoLink.jsx`)

**Purpose**: Slide with a link to a demo application

**Data Structure**:
```javascript
demoWithoutOffline: {
  id: "demoWithoutOffline",
  title: "Demo - App without offline support",
  copy: "See how an app behaves without offline capabilities.",
  link: "/demo-1", // Route to demo page
  linkText: "Demo app" // Optional: not currently used
}
```

**Usage in page.js**:
```jsx
<DemoLink data={data.demoWithoutOffline} />
```

**Features**:
- Centered title
- Clickable link text
- Hover animations

---

### 6. Thanks (`Thanks.jsx`)

**Purpose**: Final slide with thank you message, QR code, and social links

**Data Structure**:
```javascript
thank: {
  title: "Thanks & QA ?",
  social: [
    {
      icon: "FaLinkedin",
      content: "/in/jjayy",
      url: "https://www.linkedin.com/in/jjayy"
    },
    // ... more social links
  ]
}
```

**Usage in page.js**:
```jsx
<Thanks data={data.thank} />
```

**Features**:
- QR code image (expects `/images/jaga3421.png` or similar)
- Social media links
- Centered layout

---

## Supporting Components

### SlideWrapper
Wraps each slide with consistent styling:
- Full-screen height (`h-screen`)
- Snap scrolling (`snap-center`)
- Centered content with max-width
- Padding and flexbox layout

### MotionH1
Animated heading component:
- Uses Framer Motion for entrance animations
- Pink color (`text-pink-600`)
- Uppercase, thin font
- Triggers animation when in view

### TimerComponent
Timer in top-right corner:
- Takes `timer` prop (minutes)
- Play/pause functionality
- Color changes: green → yellow → red as time decreases
- Blinks when timer reaches 0

### RBLogo
Logo component (likely React Bangalore logo overlay)

### AnimatedImage
Animated image component (used at the end)

## How to Create a New Presentation

### Step 1: Update `data.js`

1. Open `app/data.js`
2. Modify or add new data objects following the structure above
3. Each key in the data object corresponds to a slide or section

### Step 2: Update `page.js`

1. Import the slide components you need:
```jsx
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
// ... etc
```

2. Import the data:
```jsx
import data from './data';
```

3. Render slides in order:
```jsx
export default function Page() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      <RBLogo />
      
      <Intro data={data.intro} />
      <SingleList data={data.agenda} />
      <HorizandalLarge data={data.yourSection} />
      {/* ... more slides */}
      
      <Thanks data={data.thank} />
      <TimerComponent timer={30} />
    </main>
  );
}
```

### Step 3: Organize Your Content

- **Intro**: Title slide with your info
- **SingleList**: Use for agenda, key points, or simple lists
- **HorizandalLarge**: Use for detailed explanations with multiple sub-topics
- **HorizandalSmall**: Use for comparing 4 items side-by-side
- **DemoLink**: Use to link to demo applications
- **Thanks**: Final slide

## Data Organization Tips

1. **Naming Convention**: Use camelCase for data keys (e.g., `whatIsOfflineFirst`)
2. **Group Related Content**: Keep related slides together in the data object
3. **Reuse Components**: Use the same component type for similar content structures
4. **Images**: Store images in `public/images/` and reference them with `/images/filename.png`
5. **External Images**: Use full URLs for external images in data

## Styling

- **Background**: Dark gray `bg-[rgb(36,36,36)]`
- **Text**: Light gray `text-gray-300`
- **Accents**: Pink `text-pink-600` for headings
- **Cards**: Use `cardPrimary` class for card styling
- **Responsive**: Uses Tailwind CSS with responsive breakpoints

## Navigation

- **Arrow Keys**: Press down/up to navigate between slides
- **Scroll**: Mouse wheel or trackpad scrolling
- **Snap Points**: CSS snap scrolling ensures slides align perfectly

## Animation System

- Uses `react-intersection-observer` to detect when slides enter viewport
- Framer Motion variants defined in `app/framerVariants/index.js`:
  - `HxVariants`: For headings
  - `VariantStaggerParent`: For parent containers
  - `VariantStaggerChildRight`: For items animating from right
  - `VariantStaggerChildShow`: For fade-in animations

## Common Patterns

### Adding a New Section with Multiple Sub-slides

```javascript
// In data.js
newSection: {
  id: "newSection",
  title: "Section Title",
  horizandalSubSlides: [
    {
      title: "First Point",
      list: [
        { title: "Key Point", content: "Explanation" }
      ]
    },
    {
      title: "Second Point",
      list: [
        { title: "Key Point", content: "Explanation" }
      ]
    }
  ]
}
```

```jsx
// In page.js
<HorizandalLarge data={data.newSection} />
```

### Adding a Simple List Slide

```javascript
// In data.js
keyPoints: {
  id: "keyPoints",
  title: "Key Points",
  subtitles: [
    "Point 1",
    "Point 2",
    "Point 3"
  ]
}
```

```jsx
// In page.js
<SingleList data={data.keyPoints} />
```

## Best Practices

1. **Keep Data Separate**: All content should be in `data.js`, not hardcoded in components
2. **Consistent Structure**: Follow the existing data structure patterns
3. **Test Navigation**: Ensure slides flow smoothly when navigating
4. **Image Optimization**: Optimize images before adding to `public/images/`
5. **Code Blocks**: Keep code examples concise and readable
6. **Timer**: Adjust timer duration based on presentation length

## File Structure Summary

```
app/
├── page.js              # Main presentation page
├── data.js              # All presentation data
├── slides/              # Slide components
│   ├── Intro.jsx
│   ├── SingleList.jsx
│   ├── HorizandalLarge.jsx
│   ├── HorizandalSmall.jsx
│   ├── DemoLink.jsx
│   └── Thanks.jsx
├── components/          # Reusable components
│   ├── SlideWrapper.jsx
│   ├── MotionH1.jsx
│   ├── TimerComponent.jsx
│   └── ...
└── framerVariants/      # Animation variants
    └── index.js
```

## Quick Reference: Component → Data Structure

| Component | Key Data Fields |
|-----------|----------------|
| `Intro` | `title`, `author`, `social[]` |
| `SingleList` | `id`, `title`, `subtitles[]` |
| `HorizandalLarge` | `id`, `title`, `horizandalSubSlides[]` with `title`, `list[]`, `image?`, `code?`, `language?` |
| `HorizandalSmall` | `id`, `title`, `horizandalSubSlides[]` with `title`, `content`, `image?`, `example?`, `link?` |
| `DemoLink` | `id`, `title`, `copy`, `link`, `linkText?` |
| `Thanks` | `title`, `social[]` |

---

**Note**: This template is designed for tech talk presentations. To create a new presentation, primarily modify `data.js` and adjust the component order in `page.js`. The slide components are reusable templates that work with any data following the specified structure.

