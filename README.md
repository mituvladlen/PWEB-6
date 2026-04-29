# Wallboard - Lab 6 Front-end

Client-side web app for managing wallpapers in a Pinterest-style board.

## Topic
Wallpaper organizer where users can add wallpapers by URL, like/unlike items, remove items, and filter by category.

## Library Used
- Alpine.js (frontend library, loaded via CDN)

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
- index.html: App markup
- styles.css: Custom theme and responsive styling
- app.js: Alpine.js logic and localStorage persistence

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
Because this is a static app, you can run it with any local static server.

Option A (VS Code Live Server extension):
- Open index.html with Live Server

Option B (Node, recommended on this setup):
- Run: npx --yes serve . -l 5500
- Open: http://localhost:5500

Option C (Python):
- Run: python -m http.server 5500
- Open: http://localhost:5500
