export type User = {
  id: number;
  name: string;
  created_at: Date;
  password: string;
};

export type Movie = {
  movie_id: number;
  thumbnail: string;
  title: string;
  description: string;
  rating: number;
  trailer: string;
};

export type FavoriteMovie = {
  user_id: number;
  movie_id: number;
};
