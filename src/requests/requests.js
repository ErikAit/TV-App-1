import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    const response = await fetch('http://smartersapp.vip/player_api.php?username=13p9dl2r0d&password=eoqc714tty&type=m3u_plus&output=ts&action=get_vod_categories');
    const categoriesData = await response.json();
    set({ categories: categoriesData });
  },
}));


// http://smartersapp.vip/get.php?username=13p9dl2r0d&password=eoqc714tty&type=m3u_plus&output=ts


export const useMovieStore = create((set) => ({
  movies: [],
  fetchMovies: async () => {
    const response = await fetch('http://smartersapp.vip/player_api.php?username=13p9dl2r0d&password=eoqc714tty&type=m3u_plus&output=ts&action=get_vod_streams');
    const moviesData = await response.json();
    set({ movies: moviesData });
  },
}));

export const useMenuTitle = create((set) => ({
  menuTitles: [
    { id: 1, title: 'Home' },
    { id: 2, title: 'Search' },
    { id: 3, title: 'lorem' },
    { id: 4, title: 'Lives' },
    { id: 5, title: 'Movies' },
    { id: 6, title: 'Favorites' },
    { id: 7, title: 'Me' },
    { id: 8, title: 'Settings' },
    { id: 9, title: 'OFF' },
  ],
}));

export const useFocusStore = create((set, get) => ({
  selectedIndex: 0,
  focusedCategoryIndex: 0,
  isFirstSelected: false,
  focusedTitle: 0,
  direction: '',
  sliceStart: 0,
  sliceEnd: 12,
  prevIndex: 0,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setFocusedCategoryIndex: (index) => set({ focusedCategoryIndex: index }),
  setFocusedTitle: (index) => set({ focusedTitle: index }),
  setDirection: (value) => set({ direction: value }),
  setSliceStart: (value) => set({ sliceStart: value }),
  setSliceEnd: (value) => set({ sliceEnd: value }),
  setPrevIndex: (value) => set({ prevIndex: value }),
  handleKeyDown: (e) => {
    const { selectedIndex, focusedCategoryIndex, isFirstSelected, focusedTitle, direction, sliceStart, sliceEnd, prevIndex } = get();
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
        set({ direction: 'left' });

        if (selectedIndex > 5) {
          set({ sliceEnd: sliceEnd - 1 })
        }

        if (selectedIndex === 0) {
          set({ isFirstSelected: true });
          set({ selectedIndex: -1 });
        } else {
          setTimeout(() => {
            set({ selectedIndex: Math.max(selectedIndex - 1, 0) });
          }, 200);
        }
      } else if (e.key === 'ArrowRight') {
        set({ direction: 'right' });

        if (selectedIndex - prevIndex >= 1) {
          set({ sliceEnd: sliceEnd + 1 })
        }

        setTimeout(() => {
          set({ selectedIndex: Math.min(selectedIndex + 1, focusedCategoryMovies.length - 1) });
        }, 200);

        if (isFirstSelected) {
          set({ selectedIndex: 0 });
        }
        set({ isFirstSelected: false });
      } else if (e.key === 'ArrowUp') {
        set({ direction: 'up' });

        if (isFirstSelected) {
          if (focusedTitle > 0) {
            setTimeout(() => {
              set({ focusedTitle: focusedTitle - 1 });
            }, 200)
          }
        } else if (focusedCategoryIndex > 0) {
          const newCategoryIndex = focusedCategoryIndex - 1;
          const newCategoryMovies = getMoviesByCategory(categories[newCategoryIndex].category_id);
          set({ focusedCategoryIndex: newCategoryIndex });
          set({ selectedIndex: Math.min(selectedIndex, newCategoryMovies.length - 1) });
        }
      } else if (e.key === 'ArrowDown') {
        set({ direction: 'down' });

        if (isFirstSelected) {
          if (focusedTitle < menuTitles.length - 1) {
            setTimeout(() => {
              set({ focusedTitle: focusedTitle + 1 });
            }, 200)
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
