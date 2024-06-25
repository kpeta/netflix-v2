import { createFavoriteMovie } from "@/server/actions/favMovies";

function Form() {
  return (
    <>
      <h1>Form</h1>
      <form
        action={async (formData: FormData) => {
          "use server";
          try {
            await createFavoriteMovie(
              Number(formData.get("user_id") as string),
              Number(formData.get("movie_id") as string)
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3>User ID:</h3>
          <input type="number" name="user_id" />
          <h3>Movie ID:</h3>
          <input type="number" name="movie_id" />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Form;
