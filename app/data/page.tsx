import { getMovie } from "@/server/fetchers/movies";
import { getUsers } from "@/server/fetchers/users";
import { getUserFavoriteMovies } from "@/server/fetchers/favMovies";

export const revalidate = 0;

export default async function Notes() {
  //get all users, movies and user favorite movies and return them wrapped in <main> and <pre> tags
  const users = await getUsers();
  //get movies 1 & 2
  const movies = await Promise.all([getMovie(1), getMovie(2)]);
  //get favMovies of user 1 and 3
  const favMovies = await Promise.all([
    getUserFavoriteMovies(1),
    getUserFavoriteMovies(3),
  ]);
  return (
    <main>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h1>Movies</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
      <h1>Fav Movies</h1>
      <pre>{JSON.stringify(favMovies, null, 2)}</pre>
    </main>
  );
}

// const newUser = {
//   name: 'John Doe',
//   created_at: new Date(),
//   password: 'password123',
// };

// const { data, error } = await supabase.from('users').insert(newUser);

// if (error) {
//   console.error(error);
// } else {
//   console.log(data);
// }

// const newMovie = {
//   thumbnail: 'https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg',
//   title: 'Example Movie',
//   description: 'This is an example movie.',
//   rating: 8.5,
//   trailer: 'https://www.youtube.com/watch?v=U2Qp5pL3ovA',
// };

// const { data, error } = await supabase.from('movies').insert(newMovie);

// if (error) {
//   console.error(error);
// } else {
//   console.log(data);
// }

// const newFavorite = {
//   user_id: 1, // replace with the ID of the user
//   movie_id: 1, // replace with the ID of the movie
// };

// const { data, error } = await supabase.from('fav_movies').insert(newFavorite);

// if (error) {
//   console.error(error);
// } else {
//   console.log(data);
// }

// // Add a user's favorite movie
// async function addUserFavoriteMovie(userId: number, movieId: number): Promise<{ error: Error | null }> {
//   const { error } = await supabase
//     .from('fav_movies')
//     .insert({ user_id: userId, movie_id: movieId });
//   if (error) {
//     console.error('Error adding user favorite movie:', error);
//     return { error };
//   }
//   return { error: null };
// }
