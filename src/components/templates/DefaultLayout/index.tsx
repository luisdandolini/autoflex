import { Outlet } from "react-router-dom";
import Navbar from "../../organisms/Navbar";
import Footer from "../../organisms/Footer";

export const DefaultLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
