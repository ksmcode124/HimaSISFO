"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  redirect("/");
}

export type SignInResult =
  | { success: true }
  | { success: false; message: string };

export async function signInAction(
  formData: FormData
): Promise<SignInResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { success: false, message: "Invalid form data" };
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true };
  } catch {
    return { success: false, message: "Invalid credentials" };
  }
}


export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/login");
}