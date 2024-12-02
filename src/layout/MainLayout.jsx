import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/DarkModeToggle";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
