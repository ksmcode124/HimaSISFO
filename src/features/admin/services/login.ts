import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {

  await auth.api.signInEmail({
    body: {
      ...payload
    },
  });

  redirect('/admin')
}

