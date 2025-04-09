"use server";

import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateToken = async (payload) => {
  const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const cookieStore = await cookies();
  cookieStore.set({
    name: "switchhere_auth",
    value: token,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  return token;
};
