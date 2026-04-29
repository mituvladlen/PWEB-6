# Wallboard - Lab 6 Front-end

Client-side web app for managing wallpapers in a Pinterest-style board.

## Topic
Wallpaper organizer where users can add wallpapers by URL, like/unlike items, remove items, and filter by category.

## Library Used
- React 18 with Vite (modern frontend framework and build tool)

## Entity
Wallpaper entity fields:
- id
- title
- imageUrl
- category (cars, nature, animals, other)
- liked
- createdAt

## Features
- Add wallpaper
- Remove wallpaper
- Like / unlike wallpaper
- Filter by category
- Search wallpapers by title
- Custom theme and style
- Light / dark mode toggle
- Responsive layout for mobile and desktop

## State Management
Runtime state:
- Managed in browser memory using Alpine.js component state

Persisted browser state:
- localStorage
- Saved wallpapers list
- Saved selected filter
- Saved selected theme (light or dark)

## User Flows
1. Add wallpaper flow
- User enters title, image URL, category
- App validates fields and URL protocol
- New wallpaper card appears at the start of the board
- Data is stored in localStorage

2. Remove wallpaper flow
- User clicks Remove on a card
- Card disappears from the board
- Data is updated in localStorage

3. Like flow
- User clicks Like / Liked button
- Card like state toggles
- Data is updated in localStorage

4. Filter flow
- User clicks a category chip (All, Cars, Nature, Animals, Other)
- Board updates to show matching wallpapers
- Last selected filter is saved in localStorage

5. Theme flow
- User clicks Dark Mode / Light Mode button
- App switches between light and dark themes
- Selected theme is saved in localStorage and restored on next visit

## Accessibility Notes
- Semantic structure with header, main, sections, labels
- Buttons include descriptive aria-label values
- Form controls are labeled
- Keyboard focus styles are visible
- Images include descriptive alt text

## Project Structure
- index.html: React app entry point
- vite.config.js: Vite build configuration
- package.json: Dependencies and scripts
- src/App.jsx: Main React component with all app logic
- src/main.jsx: React DOM render entry
- styles.css: Custom theme and responsive styling
- images/: Pre-downloaded seed image assets (default wallpapers)

## About "Local Images"
The app uses localStorage to save all wallpaper metadata (title, URL, category, likes) in the browser.
- **Seed images**: The 4 default wallpapers are stored as local files in the images/ folder for fast loading.
- **User-added images**: When you add a new wallpaper via URL, the metadata is saved in localStorage, but the image itself stays at the original URL (not downloaded to your disk). This is by design—a static web app can't write to your file system.

## Public Hosting
Deploy on GitHub Pages (static hosting):
1. Push repository to GitHub
2. Open repository settings
3. Go to Pages
4. Select Deploy from a branch
5. Select main branch and root folder
6. Save and use generated public URL in this README

Public link:
- Add your final GitHub Pages link here

## Suggested Branch and PR Split (5 mini tasks)
1. feat/theme-shell-and-layout
- App shell, custom style direction, light/dark toggle, responsive base

2. feat/wallpaper-entity-add-remove
- Entity model, add form, list rendering, remove action, validation

3. feat/likes-filters-search-storage
- Like/unlike, category filter, search, localStorage integration

4. feat/accessibility-and-ui-polish
- Accessibility pass, keyboard/focus improvements, animation and visual polish

5. feat/readme-and-deployment
- Final README, deployment, screenshots, release-ready cleanup

## How to Run Locally
Because this is a React app built with Vite, you need to install dependencies and run the dev server.

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

To build for production:
```bash
npm run build
```

To preview production build:
```bash
npm run preview
```
