# Lab 6 - Frontend

Author: Mitu Vladlen - FAF-232

---

## Features

- Add wallpapers with title, image URL, and category
- Remove wallpapers from collection
- Like/unlike wallpapers to mark favorites
- Filter wallpapers by category (All, Cars, Nature, Animals, Other)
- Search wallpapers by title
- Light/dark theme toggle with system preference detection
- Dedicated section for liked wallpapers
- Responsive design for desktop and mobile
- All data persisted in browser localStorage

---

## Why This Site Is Good & Useful

The Wallboard app provides a simple, fast way to organize and manage wallpapers without needing a backend server. 

- Users can quickly collect and organize their favorite wallpapers in categories
- The search and filter features make it easy to find specific wallpapers
- Theme support (light/dark) improves user comfort and accessibility
- All data stays on the user's device - no privacy concerns
- Works offline without internet connection
- Responsive layout works on phones, tablets, and desktops

---

## User Flow

1. User opens the app and sees 3 default wallpapers
2. User can immediately:
   - Like/unlike wallpapers
   - Toggle between light and dark theme
   - Search for wallpapers by title
   - Filter by category
3. User adds new wallpapers by filling the form:
   - Enter title
   - Paste image URL
   - Select category
   - Click "Add Wallpaper"
4. New wallpaper appears in the collection with animation
5. User can like wallpapers and view all liked items in the "Liked Wallpapers" section
6. User can remove any wallpaper with the Remove button
7. All changes are saved automatically - data persists on next visit

---

## Project Structure

```
Lab6-PWEB/
├── src/
│   ├── App.jsx              Main React component with all app logic
│   └── main.jsx             React entry point
├── index.html               HTML entry point for Vite
├── styles.css               All styling and theme definitions
├── vite.config.js           Vite build configuration
├── package.json             Dependencies and scripts
├── images/                  Wallpaper image assets
│   ├── mountain-drift.jpg
│   ├── neon-wheel.jpg
│   ├── golden-retriever-mood.jpg
│   └── fallback.jpg
└── README.md                This file
```

### Key Files

**src/App.jsx**
- Main React component handling all app logic
- State management: wallpapers, theme, filters, search, form data
- Event handlers for: add, remove, like, filter, theme toggle
- Rendering: header, form, wallpaper board, liked section

**styles.css**
- CSS custom properties for light and dark themes
- Responsive grid layout (320px sidebar + content on desktop)
- Single column layout on mobile
- Component styles for cards, buttons, inputs

**index.html**
- Root div where React mounts
- Meta tags and fonts
- Theme initialization before React loads

---

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in browser

To build for production:
```bash
npm run build
```

---

## Technology Stack

- React 18 - UI framework
- Vite 5 - Build tool and dev server
- CSS3 - Styling and themes
- localStorage API - Data persistence

---

**Status:** Complete - All features implemented and tested
