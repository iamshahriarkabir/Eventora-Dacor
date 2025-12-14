import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import CartDrawer from "../components/shared/CartDrawer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <Navbar />
      <CartDrawer />
      <div className="grow pt-16">
        {/* pt-16 ensures content isn't hidden behind fixed navbar */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
