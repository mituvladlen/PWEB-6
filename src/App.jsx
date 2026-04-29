import React, { useState, useEffect, useMemo } from 'react'

const WALLPAPER_STORAGE_KEY = 'wallboard.wallpapers.v1'
const FILTER_STORAGE_KEY = 'wallboard.filter.v1'
const THEME_STORAGE_KEY = 'wallboard.theme.v1'

const FALLBACK_IMAGE = 'images/fallback.jpg'

const LEGACY_IMAGE_MAP = {
  'photo-1464822759023-fed622ff2c3b': 'images/mountain-drift.jpg',
  'photo-1492144534655-ae79c964c9d7': 'images/neon-wheel.jpg',
  'photo-1552053831-71594a27632d': 'images/golden-retriever-mood.jpg',
  'photo-1534447677768-be436bb09401': 'images/fallback.jpg',
}

const DEFAULT_WALLPAPERS = [
  {
    id: 'seed-1',
    title: 'Mountain Drift',
    imageUrl: 'images/mountain-drift.jpg',
    category: 'nature',
    liked: false,
    createdAt: Date.now() - 5000,
  },
  {
    id: 'seed-2',
    title: 'Neon Wheel',
    imageUrl: 'images/neon-wheel.jpg',
    category: 'cars',
    liked: true,
    createdAt: Date.now() - 4000,
  },
  {
    id: 'seed-3',
    title: 'Golden Retriever Mood',
    imageUrl: 'images/golden-retriever-mood.jpg',
    category: 'animals',
    liked: false,
    createdAt: Date.now() - 3000,
  },
]

const CATEGORIES = ['cars', 'nature', 'animals', 'other']

const CATEGORY_LABELS = {
  cars: 'Cars',
  nature: 'Nature',
  animals: 'Animals',
  other: 'Other',
}

function mapLegacyImageUrl(imageUrl) {
  for (const [legacyToken, localPath] of Object.entries(LEGACY_IMAGE_MAP)) {
    if (typeof imageUrl === 'string' && imageUrl.includes(legacyToken)) {
      return localPath
    }
  }
  return imageUrl
}

function loadWallpapers() {
  const raw = localStorage.getItem(WALLPAPER_STORAGE_KEY)
  if (!raw) {
    return [...DEFAULT_WALLPAPERS]
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return [...DEFAULT_WALLPAPERS]
    }

    return parsed
      .filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string')
      .map((item) => ({
        ...item,
        imageUrl: mapLegacyImageUrl(item.imageUrl),
      }))
  } catch (error) {
    console.warn('Could not parse local wallpapers', error)
    return [...DEFAULT_WALLPAPERS]
  }
}

function getInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  const prefersDark =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function App() {
  const [wallpapers, setWallpapers] = useState([])
  const [theme, setThemeState] = useState(getInitialTheme())
  const [filterCategory, setFilterCategory] = useState(
    localStorage.getItem(FILTER_STORAGE_KEY) || 'all'
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    category: 'cars',
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setWallpapers(loadWallpapers())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter((wallpaper) => {
      const categoryMatch =
        filterCategory === 'all' || wallpaper.category === filterCategory
      const query = searchTerm.toLowerCase()
      const searchMatch = wallpaper.title.toLowerCase().includes(query)
      return categoryMatch && searchMatch
    })
  }, [wallpapers, filterCategory, searchTerm])

  const likedWallpapers = useMemo(() => {
    return wallpapers.filter((wallpaper) => wallpaper.liked)
  }, [wallpapers])

  const createId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `w-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  }

  const isValidHttpUrl = (value) => {
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  const persistWallpapers = (updatedWallpapers) => {
    localStorage.setItem(WALLPAPER_STORAGE_KEY, JSON.stringify(updatedWallpapers))
  }

  const handleAddWallpaper = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const title = formData.title.trim()
    const imageUrl = formData.imageUrl.trim()

    if (!title || !imageUrl) {
      setErrorMessage('Title and image URL are required.')
      return
    }

    if (!isValidHttpUrl(imageUrl)) {
      setErrorMessage('Please enter a valid URL that starts with http or https.')
      return
    }

    const newWallpaper = {
      id: createId(),
      title,
      imageUrl,
      category: formData.category,
      liked: false,
      createdAt: Date.now(),
    }

    const updated = [newWallpaper, ...wallpapers]
    setWallpapers(updated)
    persistWallpapers(updated)
    setFormData({ title: '', imageUrl: '', category: 'cars' })
  }

  const handleRemoveWallpaper = (id) => {
    const updated = wallpapers.filter((item) => item.id !== id)
    setWallpapers(updated)
    persistWallpapers(updated)
  }

  const handleToggleLike = (id) => {
    const updated = wallpapers.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    )
    setWallpapers(updated)
    persistWallpapers(updated)
  }

  const handleSetFilter = (category) => {
    setFilterCategory(category)
    localStorage.setItem(FILTER_STORAGE_KEY, category)
  }

  const handleToggleTheme = () => {
    setThemeState(theme === 'light' ? 'dark' : 'light')
  }

  const handleSetFallbackImage = (e) => {
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.src = FALLBACK_IMAGE
    }
  }

  return (
    <div className="background-glow" aria-hidden="true">
      <div className="page-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Lab 6 Front-end</p>
            <h1>Wallboard</h1>
            <p className="subtitle">Collect and organize wallpapers by vibe.</p>
          </div>
          <button
            className="theme-btn"
            onClick={handleToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            aria-pressed={theme === 'dark'}
            type="button"
          >
            <span className="theme-label">Theme</span>
            <span className="theme-switch" aria-hidden="true">
              <span className="theme-switch-text light">Light</span>
              <span className="theme-switch-text dark">Dark</span>
              <span className="theme-switch-knob"></span>
            </span>
          </button>
        </header>

        <main className="layout">
          <section className="panel form-panel" aria-labelledby="add-wallpaper-heading">
            <h2 id="add-wallpaper-heading">Add Wallpaper</h2>
            <form className="add-form" onSubmit={handleAddWallpaper}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Sunset Drive"
                required
              />

              <label htmlFor="imageUrl">Image URL</label>
              <input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/photo.jpg"
                required
              />

              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              <p className="category-hint">
                <strong>Selected:</strong> <span>{CATEGORY_LABELS[formData.category]}</span>
              </p>

              <button type="submit" className="primary-btn">
                Add Wallpaper
              </button>
              {errorMessage && (
                <p className="error" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
          </section>

          <section className="panel board-panel" aria-labelledby="board-heading">
            <div className="panel-header">
              <h2 id="board-heading">Wallpaper Board</h2>
              <p>
                <strong>{wallpapers.length}</strong> total
              </p>
            </div>

            <div className="filters" role="toolbar" aria-label="Wallpaper filters">
              <button
                className={`chip ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleSetFilter('all')}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`chip ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => handleSetFilter(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <label htmlFor="search" className="sr-only">
              Search wallpapers by title
            </label>
            <input
              id="search"
              className="search-input"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title"
            />

            <p className="small-note">{filteredWallpapers.length} items visible</p>

            {filteredWallpapers.length > 0 ? (
              <div className="gallery">
                {filteredWallpapers.map((wallpaper) => (
                  <article key={wallpaper.id} className="card" tabIndex="0">
                    <img
                      src={wallpaper.imageUrl}
                      alt={`Wallpaper: ${wallpaper.title}`}
                      loading="lazy"
                      onError={handleSetFallbackImage}
                    />
                    <div className="card-body">
                      <div className="meta">
                        <h3>{wallpaper.title}</h3>
                        <span className="badge">{CATEGORY_LABELS[wallpaper.category]}</span>
                      </div>
                      <div className="actions">
                        <button
                          className={`like-btn ${wallpaper.liked ? 'liked' : ''}`}
                          onClick={() => handleToggleLike(wallpaper.id)}
                          aria-label={
                            wallpaper.liked
                              ? `Unlike ${wallpaper.title}`
                              : `Like ${wallpaper.title}`
                          }
                        >
                          {wallpaper.liked ? 'Liked' : 'Like'}
                        </button>
                        <button
                          className="danger-btn"
                          onClick={() => handleRemoveWallpaper(wallpaper.id)}
                          aria-label={`Remove ${wallpaper.title}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty">
                <h3>No wallpapers match your filters.</h3>
                <p>Try a different category or add a new wallpaper.</p>
              </div>
            )}
          </section>

          {likedWallpapers.length > 0 && (
            <section className="panel liked-panel" aria-labelledby="liked-heading">
              <div className="panel-header">
                <h2 id="liked-heading">❤️ Liked Wallpapers</h2>
                <p>
                  <strong>{likedWallpapers.length}</strong> liked
                </p>
              </div>

              <div className="gallery">
                {likedWallpapers.map((wallpaper) => (
                  <article key={wallpaper.id} className="card" tabIndex="0">
                    <img
                      src={wallpaper.imageUrl}
                      alt={`Wallpaper: ${wallpaper.title}`}
                      loading="lazy"
                      onError={handleSetFallbackImage}
                    />
                    <div className="card-body">
                      <div className="meta">
                        <h3>{wallpaper.title}</h3>
                        <span className="badge">{CATEGORY_LABELS[wallpaper.category]}</span>
                      </div>
                      <div className="actions">
                        <button
                          className={`like-btn ${wallpaper.liked ? 'liked' : ''}`}
                          onClick={() => handleToggleLike(wallpaper.id)}
                          aria-label={
                            wallpaper.liked
                              ? `Unlike ${wallpaper.title}`
                              : `Like ${wallpaper.title}`
                          }
                        >
                          {wallpaper.liked ? 'Liked' : 'Like'}
                        </button>
                        <button
                          className="danger-btn"
                          onClick={() => handleRemoveWallpaper(wallpaper.id)}
                          aria-label={`Remove ${wallpaper.title}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
