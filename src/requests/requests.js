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
