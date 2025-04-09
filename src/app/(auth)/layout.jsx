import Navbar from "@/components/organisms/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticatedLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("switchhere_auth");
  if (!authCookie) {
    redirect("/auth");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthenticatedLayout;
