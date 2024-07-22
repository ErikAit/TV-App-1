import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    const response = await fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_categories');
    const categoriesData = await response.json();
    set({ categories: categoriesData });
  },
}));

export const useMovieStore = create((set) => ({
  movies: [],
  fetchMovies: async () => {
    const response = await fetch('https://inter.natv.fm/player_api.php?username=rokuappdev&password=20928292684&action=get_vod_streams');
    const moviesData = await response.json();
    set({ movies: moviesData });
  },
}));

export const useFocusStore = create((set, get) => ({
  selectedIndex: 0,
  focusedCategoryIndex: 0,
  isFirstSelected: false,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setFocusedCategoryIndex: (index) => set({ focusedCategoryIndex: index }),
  handleKeyDown: (e) => {
    const { selectedIndex, focusedCategoryIndex, isFirstSelected } = get();
    const { categories } = useCategoryStore.getState();
    const { movies } = useMovieStore.getState();

    const getMoviesByCategory = (categoryId) => {
      return movies.filter(movie => movie.category_id === categoryId);
    };

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const focusedCategory = categories[focusedCategoryIndex];
      const focusedCategoryMovies = getMoviesByCategory(focusedCategory.category_id);

      if (e.key === 'ArrowLeft') {
        if (selectedIndex === 0) {
          set({ isFirstSelected: true });
        } else {
          set({ selectedIndex: Math.max(selectedIndex - 1, 0) });
        }
      } else if (e.key === 'ArrowRight') {
        set({ selectedIndex: Math.min(selectedIndex + 1, focusedCategoryMovies.length - 1) });
        set({ isFirstSelected: false });
      } else if (e.key === 'ArrowUp') {
        if (focusedCategoryIndex > 0) {
          const newCategoryIndex = focusedCategoryIndex - 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          set({ focusedCategoryIndex: newCategoryIndex });
          set({ selectedIndex: Math.min(selectedIndex, newCategoryMovies.length - 1) });
        }
      } else if (e.key === 'ArrowDown') {
        if (focusedCategoryIndex < categories.length - 1) {
          const newCategoryIndex = focusedCategoryIndex + 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          set({ focusedCategoryIndex: newCategoryIndex });
          set({ selectedIndex: Math.min(selectedIndex, newCategoryMovies.length - 1) });
        }
      }
    }
  }
}));
