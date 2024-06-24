export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export type MenuItem = {
  name: string;
  link: string;
};

export const menuItems: MenuItem[] = [
  { name: "Home", link: "/" },
  { name: "TV Shows", link: "/tv-shows" },
  { name: "Movies", link: "/movies" },
  { name: "New & Popular", link: "/new-and-popular" },
  { name: "My List", link: "/my-list" },
];
