const WALLPAPER_STORAGE_KEY = "wallboard.wallpapers.v1";
const FILTER_STORAGE_KEY = "wallboard.filter.v1";
const THEME_STORAGE_KEY = "wallboard.theme.v1";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80";

const DEFAULT_WALLPAPERS = [
  {
    id: "seed-1",
    title: "Mountain Drift",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    category: "nature",
    liked: false,
    createdAt: Date.now() - 5000
  },
  {
    id: "seed-2",
    title: "Neon Wheel",
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    category: "cars",
    liked: true,
    createdAt: Date.now() - 4000
  },
  {
    id: "seed-3",
    title: "Golden Retriever Mood",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
    category: "animals",
    liked: false,
    createdAt: Date.now() - 3000
  }
];

function wallpaperApp() {
  return {
    wallpapers: [],
    categories: ["cars", "nature", "animals", "other"],
    filterCategory: "all",
    searchTerm: "",
    theme: "light",
    form: {
      title: "",
      imageUrl: "",
      category: "nature"
    },
    errorMessage: "",

    get filteredWallpapers() {
      return this.wallpapers.filter((wallpaper) => {
        const categoryMatch =
          this.filterCategory === "all" || wallpaper.category === this.filterCategory;
        const query = this.searchTerm.toLowerCase();
        const searchMatch = wallpaper.title.toLowerCase().includes(query);
        return categoryMatch && searchMatch;
      });
    },

    init() {
      this.wallpapers = this.loadWallpapers();
      this.filterCategory = localStorage.getItem(FILTER_STORAGE_KEY) || "all";
      this.theme = this.getInitialTheme();
      this.applyTheme();
    },

    getInitialTheme() {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }

      const prefersDark =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    },

    loadWallpapers() {
      const raw = localStorage.getItem(WALLPAPER_STORAGE_KEY);
      if (!raw) {
        return [...DEFAULT_WALLPAPERS];
      }

      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          return [...DEFAULT_WALLPAPERS];
        }

        return parsed.filter((item) => this.isValidWallpaper(item));
      } catch (error) {
        console.warn("Could not parse local wallpapers", error);
        return [...DEFAULT_WALLPAPERS];
      }
    },

    isValidWallpaper(item) {
      return (
        item &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.imageUrl === "string" &&
        typeof item.category === "string" &&
        typeof item.liked === "boolean"
      );
    },

    addWallpaper() {
      this.errorMessage = "";
      const title = this.form.title.trim();
      const imageUrl = this.form.imageUrl.trim();

      if (!title || !imageUrl) {
        this.errorMessage = "Title and image URL are required.";
        return;
      }

      if (!this.isValidHttpUrl(imageUrl)) {
        this.errorMessage = "Please enter a valid URL that starts with http or https.";
        return;
      }

      const wallpaper = {
        id: this.createId(),
        title,
        imageUrl,
        category: this.form.category,
        liked: false,
        createdAt: Date.now()
      };

      this.wallpapers.unshift(wallpaper);
      this.persistWallpapers();
      this.resetForm();
    },

    removeWallpaper(id) {
      this.wallpapers = this.wallpapers.filter((item) => item.id !== id);
      this.persistWallpapers();
    },

    toggleLike(id) {
      this.wallpapers = this.wallpapers.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      );
      this.persistWallpapers();
    },

    setFilter(category) {
      this.filterCategory = category;
      localStorage.setItem(FILTER_STORAGE_KEY, category);
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, this.theme);
      this.applyTheme();
    },

    applyTheme() {
      document.documentElement.setAttribute("data-theme", this.theme);
    },

    labelFor(category) {
      const labels = {
        cars: "Cars",
        nature: "Nature",
        animals: "Animals",
        other: "Other"
      };
      return labels[category] || "Other";
    },

    setFallbackImage(event) {
      if (event.target.src !== FALLBACK_IMAGE) {
        event.target.src = FALLBACK_IMAGE;
      }
    },

    persistWallpapers() {
      localStorage.setItem(WALLPAPER_STORAGE_KEY, JSON.stringify(this.wallpapers));
    },

    resetForm() {
      this.form.title = "";
      this.form.imageUrl = "";
      this.form.category = "nature";
    },

    isValidHttpUrl(value) {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },

    createId() {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `w-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
  };
}
