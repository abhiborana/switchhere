import { Button } from "@/components/ui/button";
import Link from "next/link";

const GuestLayout = ({ children }) => {
  return (
    <>
      <header className="px-4 py-3 w-full shadow border-b flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Switchhere
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/auth">Get started</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-col flex-1 w-full h-full p-4 items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default GuestLayout;
