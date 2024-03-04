import { createUser } from "@/server/actions/users";

//TODO: add react-hook-form and make sure that username and password are not empty, and password is at least 8 characters long, and that the username is not already taken

function AddUserForm() {
  return (
    <>
      <h1>Form</h1>
      <form
        action={async (formData: FormData) => {
          "use server";
          await createUser(
            formData.get("name") as string,
            formData.get("password") as string
          );
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
          <h3>Name:</h3>
          <input type="text" name="name" />
          <h3>Password:</h3>
          <input type="text" name="password" />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default AddUserForm;
