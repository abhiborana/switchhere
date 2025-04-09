"use client";

import { Button } from "@/components/ui/button";
import useSwitchStore from "@/store";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const user = useSwitchStore((state) => state.user);
  const dispatch = useSwitchStore((state) => state.dispatch);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    Cookies.remove("switchhere_auth");
    dispatch({ type: "SET_STATE", payload: { user: null } });
    router.push("/auth");
  };

  useEffect(() => {
    if (!user) {
      const token = Cookies.get("switchhere_auth");
      const user = decode(token);
      dispatch({ type: "SET_STATE", payload: { user } });
      if (token && user && pathname == "/auth") {
        router.push("/dashboard");
      }
    }
  }, [user, pathname, router, dispatch]);

  return (
    <header className="px-4 py-3 w-full shadow border-b flex flex-wrap items-center gap-4 justify-between">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        Switchhere
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        {user ? (
          <>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant={"outline"} onClick={handleLogout}>
              <LogOutIcon className="size-4" />
              Logout
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/auth">Get started</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
