"use server";

export async function verifyCaptcha(token: string | null): Promise<string> {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      next: { revalidate: 0 }, // no caching
    });

    if (!response.ok) {
      throw new Error("Failed to verify captcha");
    }

    const data = await response.json();

    if (data.success) {
      return "success!";
    } else {
      throw new Error("Failed Captcha");
    }
  } catch (error) {
    throw new Error("Failed to verify captcha: " + error);
  }
}
