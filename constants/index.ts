import HomeIcon from "@/components/header/icons/HomeIcon";
import ListIcon from "@/components/header/icons/ListIcon";
import MoviesIcon from "@/components/header/icons/MoviesIcon";
import NewPopularIcon from "@/components/header/icons/NewPopularIcon";
import TVShowsIcon from "@/components/header/icons/TVShowsIcon";
import { ReactNode } from "react";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export type MenuItem = {
  name: string;
  link: string;
  icon: ReactNode;
};

export const menuItems: MenuItem[] = [
  { name: "Home", link: "/", icon: HomeIcon() },
  { name: "TV Shows", link: "/tv-shows", icon: TVShowsIcon() },
  { name: "Movies", link: "/movies", icon: MoviesIcon() },
  { name: "New & Popular", link: "/new-and-popular", icon: NewPopularIcon() },
  { name: "My List", link: "/my-list", icon: ListIcon() },
];
