export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
};

export type TMDBTVShow = {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  number_of_seasons: number;
  number_of_episodes: number;
};

export type TMDBVideo = {
  id: string;
  key: string;
  name: string;
  type: string;
};
