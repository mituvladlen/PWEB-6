# Lab 6 - Frontend

**Author:** Mitu Vladlen - FAF-232

---

## Overview

**Wallboard** is a modern, responsive web application for collecting and organizing wallpapers. Users can add wallpapers, categorize them, search by title, mark favorites, and enjoy a seamless dark/light theme experience. Built with React and Vite for optimal performance and developer experience.

---

## Features

### 🖼️ Wallpaper Management
- **Add Wallpapers**: Upload wallpapers with title, image URL, and category
- **Remove Wallpapers**: Delete unwanted wallpapers from your collection
- **URL Validation**: Automatic validation to ensure valid image URLs

### ❤️ Likes System
- **Mark Favorites**: Like/unlike wallpapers to save your favorites
- **Dedicated Section**: View all liked wallpapers in a dedicated "Liked Wallpapers" section
- **Persistent Likes**: Likes are saved in localStorage and persist across sessions

### 🏷️ Categorization
- **5 Categories**: Cars, Nature, Animals, Other (+ All filter)
- **Filter by Category**: Quickly filter wallpapers by category with active chip indicators
- **Default Category**: Form defaults to "Cars" with visual feedback

### 🔍 Search & Discovery
- **Real-time Search**: Search wallpapers by title as you type
- **Combined Filtering**: Category filters and search work together seamlessly
- **Item Counter**: See how many wallpapers match your current filters

### 🌓 Theme System
- **Light/Dark Modes**: Toggle between light and dark themes
- **System Preferences**: Automatically detects system color scheme preference
- **Persistent Theme**: Your theme choice is saved and restored on return
- **Beautiful Gradients**: Decorative gradient backgrounds in both themes

### 📱 Responsive Design
- **Desktop Layout** (900px+): 2-column layout with form panel on left, content on right
- **Tablet Layout** (580-900px): Single-column stacked layout
- **Mobile Layout** (<580px): Full-width vertical layout with optimized spacing
- **Touch-Friendly**: Large buttons and inputs optimized for mobile interaction

### ♿ Accessibility
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **ARIA Labels**: Clear labels for all interactive elements
- **Keyboard Navigation**: Full keyboard support for all features
- **Focus Indicators**: Visible focus outlines for keyboard navigation
- **Screen Reader Support**: Proper ARIA roles and descriptions

---

## Why This Site Is Good & Useful

### 🎯 User Value
- **Visual Organization**: Collect and organize your favorite wallpapers in one place
- **Quick Discovery**: Fast category filtering and search to find wallpapers quickly
- **Personal Preferences**: Save your favorites and customize your experience with theme selection

### 💻 Technical Excellence
- **Modern Stack**: Built with React 18 and Vite for fast performance
- **No Backend Required**: 100% client-side with localStorage persistence
- **Mobile-First**: Works seamlessly on phones, tablets, and desktops
- **Lightweight**: Minimal dependencies, fast load times
- **Developer-Friendly**: Clean React code with proper state management using hooks

### 🎨 Design Quality
- **Beautiful UI**: Modern gradient backgrounds and smooth animations
- **Responsive Layout**: Adapts perfectly to any screen size
- **Theme Flexibility**: Light/dark modes for user preference and accessibility
- **Smooth Interactions**: Cards animate in, buttons provide visual feedback

### 🔒 Data Privacy
- **No Server Required**: All data stored locally in browser localStorage
- **Complete Privacy**: Your wallpapers and preferences never leave your device
- **Offline Ready**: Works without internet connection

---

## User Flow

### First-Time User Journey

```
1. User visits Wallboard
   ↓
2. Sees beautiful interface with 3 default wallpapers
   ↓
3. Can explore features immediately:
   - Toggle theme (Light/Dark)
   - Like/Unlike wallpapers
   - Search by title
   - Filter by category
   ↓
4. Wallpapers and preferences saved automatically
```

### Complete User Flow: Adding & Organizing Wallpapers

```
┌─────────────────────────────────────────────────────────────┐
│ User Opens Wallboard                                         │
│ • System theme applied automatically                         │
│ • Previous state restored from localStorage                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Exploring Default Wallpapers                                 │
│ • Mountain Drift (Nature category)                           │
│ • Neon Wheel (Cars category, already liked)                  │
│ • Golden Retriever (Animals category)                        │
│ User clicks "Like" on favorites                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Adding a New Wallpaper                                       │
│ 1. Fill form:                                                │
│    • Title: "Mountain Sunset"                                │
│    • URL: "https://example.com/sunset.jpg"                   │
│    • Category: "Nature" (selected)                           │
│ 2. Click "Add Wallpaper"                                     │
│ 3. Form validates and adds to collection                     │
│ 4. New card appears with animation                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Discovering & Organizing                                     │
│ • Filter by "Nature" category                                │
│ • Search for "sunset" in search box                          │
│ • See combined results instantly                             │
│ • Like favorites → appears in "❤️ Liked" section            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Managing Collection                                          │
│ • Remove wallpapers with "Remove" button                     │
│ • Clear filters to see all wallpapers                        │
│ • Toggle theme for comfortable viewing                       │
│ • All changes saved automatically                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Returning User Experience                                    │
│ • All wallpapers still there                                 │
│ • All likes preserved                                        │
│ • Theme preference restored                                  │
│ • Last filter selection remembered                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
Lab6-PWEB/
│
├── 📂 src/
│   ├── App.jsx                    # Main React component (all logic & UI)
│   │   ├── State hooks: wallpapers, theme, filter, search, form
│   │   ├── Event handlers: add, remove, like, filter, theme
│   │   ├── Computed values: filteredWallpapers, likedWallpapers
│   │   └── JSX rendering: header, form, board, liked section
│   │
│   └── main.jsx                   # React entry point
│       └── Mounts App to DOM root element
│
├── 📄 index.html                  # HTML entry point for Vite
│   ├── Root div for React mounting
│   ├── Meta tags (viewport, charset)
│   └── Theme initialization script
│
├── 📄 styles.css                  # All styling & themes
│   ├── CSS custom properties (colors, fonts, shadows)
│   ├── Light theme: :root selector
│   ├── Dark theme: :root[data-theme="dark"]
│   ├── Responsive layouts: Grid, Flexbox, Media queries
│   └── Component styles: buttons, cards, panels, forms
│
├── 📄 vite.config.js              # Vite build configuration
│   ├── React plugin for JSX support
│   └── Dev server on port 5173
│
├── 📄 package.json                # Project metadata & dependencies
│   ├── react@18.3.1, react-dom@18.3.1
│   ├── vite@5.4.21, @vitejs/plugin-react
│   └── Scripts: dev, build, preview
│
├── 📂 images/                     # Pre-downloaded wallpaper assets
│   ├── mountain-drift.jpg         # Default wallpaper 1 (~242KB)
│   ├── neon-wheel.jpg             # Default wallpaper 2 (~60KB)
│   ├── golden-retriever-mood.jpg  # Default wallpaper 3 (~301KB)
│   └── fallback.jpg               # Fallback on image load error (~105KB)
│
├── 📄 README.md                   # This file
└── 📂 .git/                       # Git repository with branches
    └── commit history for all features
```

### Component Architecture

```
App Component (src/App.jsx)
├── State Management
│   ├── wallpapers[]              - All wallpapers
│   ├── theme                     - "light" or "dark"
│   ├── filterCategory            - Active category filter
│   ├── searchTerm                - Search query text
│   ├── formData                  - Form inputs (title, url, category)
│   └── errorMessage              - Form validation errors
│
├── Computed Values (useMemo)
│   ├── filteredWallpapers        - Filter by category + search
│   └── likedWallpapers           - Only liked items
│
├── Event Handlers
│   ├── handleAddWallpaper()      - Validate, create, persist
│   ├── handleRemoveWallpaper()   - Delete and persist
│   ├── handleToggleLike()        - Like/unlike and persist
│   ├── handleSetFilter()         - Change category and persist
│   └── handleToggleTheme()       - Switch theme and persist
│
└── JSX Rendering
    ├── Header (title, theme toggle)
    ├── Form Panel (add wallpaper)
    ├── Main Board
    │   ├── Filters (category chips)
    │   ├── Search input
    │   ├── Gallery (card grid)
    │   └── Item counter
    └── Liked Section (when items exist)
        └── Gallery of liked wallpapers
```

### Data Storage

```javascript
// localStorage Keys & Structures

// Key 1: Wallpapers Collection
'wallboard.wallpapers.v1': [
  {
    id: 'unique-id',
    title: 'Mountain Drift',
    imageUrl: 'images/mountain-drift.jpg',
    category: 'nature',
    liked: false,
    createdAt: 1714408320000
  },
  ...
]

// Key 2: Filter State
'wallboard.filter.v1': 'all' | 'cars' | 'nature' | 'animals' | 'other'

// Key 3: Theme Preference
'wallboard.theme.v1': 'light' | 'dark'
```

### Data Flow Diagram

```
User Interaction (e.g., Add Wallpaper)
        ↓
Event Handler (handleAddWallpaper)
        ↓
Validate Input
        ↓
State Update (setWallpapers)
        ↓
localStorage.setItem() - Persist Data
        ↓
useEffect Dependency - Trigger Re-render
        ↓
Component Re-renders
        ↓
New Wallpaper Appears in Gallery (with animation)
        ↓
Display to User
```

---

## Key Features Implementation

### localStorage Persistence
- All data automatically saved to browser storage
- Data restored on app reload
- No server backend needed

### Responsive Grid System
```css
.layout {
  display: grid;
  grid-template-columns: 320px 1fr;    /* Desktop: sidebar + content */
  gap: 1rem;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;        /* Mobile: stacked */
  }
}
```

### Theme System with CSS Variables
```css
:root {
  --bg: #f6f7f8;
  --text: #172033;
  --primary: #0f766e;
}

:root[data-theme="dark"] {
  --bg: #0c121d;
  --text: #ecf2ff;
  --primary: #22d3ee;
}
```

### React Hooks Usage
```javascript
// State Management
const [wallpapers, setWallpapers] = useState([])

// Side Effects
useEffect(() => {
  loadWallpapers()
}, [])

// Computed Values
const filteredWallpapers = useMemo(() => {
  return wallpapers.filter(w => 
    (filterCategory === 'all' || w.category === filterCategory) &&
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [wallpapers, filterCategory, searchTerm])
```

---

## How to Run Locally

### Prerequisites
- Node.js 16+ 
- npm (comes with Node.js)

### Setup

```bash
# Clone repository
git clone <repository-url>
cd Lab6-PWEB

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build
# Output: dist/ folder with static files

# Preview production build locally
npm run preview
# Open http://localhost:4173 in your browser
```

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework with hooks |
| **Vite** | 5.4.21 | Lightning-fast build tool & dev server |
| **JavaScript** | ES6+ | Modern syntax (arrow functions, destructuring, etc.) |
| **CSS3** | Latest | Custom properties, Grid, Flexbox, Media queries |
| **localStorage API** | HTML5 | Client-side data persistence |
| **Node.js/npm** | Latest | Package management |

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Accessibility Features

- ♿ Semantic HTML5 elements (`<header>`, `<main>`, `<section>`)
- 🏷️ Form labels with `<label>` elements
- 🎯 ARIA labels on interactive elements
- ⌨️ Full keyboard navigation support
- 👁️ Visible focus indicators
- 📢 Screen reader friendly content structure
- 🖼️ Descriptive alt text on images
- 🎨 High contrast colors in both themes

---

## Future Enhancements

- 🔐 User authentication & cloud sync
- 💾 Backend database for persistent storage across devices
- 📤 Export/import wallpaper collections as JSON
- 🎨 Custom category creation
- 📊 Analytics (most-liked wallpapers, trending)
- 🤝 Share collections with others via URL
- 🏷️ Tags system for better organization
- ⭐ Ratings system

---

## Development Workflow

### Branches (5-Task Sprint)
1. `feat/theme-shell-and-layout` ✅ - Responsive base + theme
2. `feat/wallpaper-entity-add-remove` ✅ - CRUD operations
3. `feat/likes-filters-search-storage` ✅ - Likes + filtering + persistence
4. `feat/react-conversion` ✅ - Alpine.js → React migration
5. `feat/readme-and-documentation` 🔄 - This branch (documentation)

### Commit History
Each feature branch has clean, descriptive commits with pull requests for teacher review.

---

## About "Local Images"

**Seed Images**: The 3 default wallpapers are stored in the `images/` folder for instant loading:
- `mountain-drift.jpg` - Featured in Nature category
- `neon-wheel.jpg` - Featured in Cars category (pre-liked)
- `golden-retriever-mood.jpg` - Featured in Animals category
- `fallback.jpg` - Displayed when image URL fails to load

**User-Added Wallpapers**: When you add a wallpaper via URL:
- ✅ Title, URL, category, likes → saved in localStorage
- ❌ Image file → NOT downloaded (static web app limitation)
- The image loads directly from the provided URL in real-time

---

## Public Link

Deploy on GitHub Pages for free static hosting:

```
[Deploy using GitHub Pages settings]
Public URL: https://username.github.io/Lab6-PWEB
```

---

## Credits & Notes

**Laboratory Assignment**: Frontend Web Development (Lab 6)  
**Student**: Mitu Vladlen - FAF-232  
**Academic Institution**: FAF  
**Completion Date**: April 2026

This project demonstrates modern web development best practices including:
- Component-based React architecture
- State management with hooks
- Responsive mobile-first design
- Accessibility compliance (WCAG)
- Client-side data persistence
- Clean code organization

---

**Status**: ✅ Complete | All features implemented and tested
