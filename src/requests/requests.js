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

export const useMenuTitle = create((set) => ({
  menuTitles: [
    { id: 1, title: 'lorem' },
    { id: 2, title: 'lorem' },
    { id: 3, title: 'lorem' },
    { id: 4, title: 'lorem' },
    { id: 5, title: 'lorem' },
    { id: 6, title: 'lorem' },
    { id: 7, title: 'lorem' },
    { id: 8, title: 'lorem' },
    { id: 9, title: 'lorem' },
  ],
}));

export const useFocusStore = create((set, get) => ({
  selectedIndex: 0,
  focusedCategoryIndex: 0,
  isFirstSelected: false,
  focusedTitle: 0,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setFocusedCategoryIndex: (index) => set({ focusedCategoryIndex: index }),
  setFocusedTitle: (index) => set({ focusedTitle: index }),
  handleKeyDown: (e) => {
    const { selectedIndex, focusedCategoryIndex, isFirstSelected, focusedTitle } = get();
    const { categories } = useCategoryStore.getState();
    const { movies } = useMovieStore.getState();
    const { menuTitles } = useMenuTitle.getState();

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
          set({ selectedIndex: -1 });
        } else {
          set({ selectedIndex: Math.max(selectedIndex - 1, 0) });
        }
      } else if (e.key === 'ArrowRight') {
        set({ selectedIndex: Math.min(selectedIndex + 1, focusedCategoryMovies.length - 1) });
        if (isFirstSelected) {
          set({ selectedIndex: 0 });
        }
        set({ isFirstSelected: false });
      } else if (e.key === 'ArrowUp') {
        if (isFirstSelected) {
          if (focusedTitle > 0) {
            set({ focusedTitle: focusedTitle - 1 });
          }
        } else if (focusedCategoryIndex > 0) {
          const newCategoryIndex = focusedCategoryIndex - 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          set({ focusedCategoryIndex: newCategoryIndex });
          set({ selectedIndex: Math.min(selectedIndex, newCategoryMovies.length - 1) });
        }
      } else if (e.key === 'ArrowDown') {
        if (isFirstSelected) {
          if (focusedTitle < menuTitles.length - 1) {
            set({ focusedTitle: focusedTitle + 1 });
          }
        } else if (focusedCategoryIndex < categories.length - 1) {
          const newCategoryIndex = focusedCategoryIndex + 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          set({ focusedCategoryIndex: newCategoryIndex });
          set({ selectedIndex: Math.min(selectedIndex, newCategoryMovies.length - 1) });
        }
      }
    }
  },
}));