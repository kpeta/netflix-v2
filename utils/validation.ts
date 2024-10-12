export const checkIfValidUsername = (username: string | undefined) => {
  // username must be between 4 ~ 31 characters, and only consists of uppercase or lowercase letters, 0-9, -, and _
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-zA-Z0-9_-]+$/.test(username)
  ) {
    return false;
  }
  return true;
};

export const checkIfValidPassword = (password: string | undefined) => {
  // password must be between 6 ~ 255 characters
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return false;
  }
  return true;
};

export function checkIfValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
