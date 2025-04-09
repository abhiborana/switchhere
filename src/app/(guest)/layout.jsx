import Navbar from "@/components/organisms/navbar";

const GuestLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full h-full p-4 items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default GuestLayout;
