export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};

export type TMDBVideo = {
  id: string;
  key: string;
  name: string;
  type: string;
};
