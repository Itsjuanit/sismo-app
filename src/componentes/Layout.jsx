import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "../pages/Footer";
import navImage from "../assets/MUNDO.png";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  console.log(location);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-[#d0c7b1] p-4 flex justify-between items-center relative border-black">
        <div className="flex items-center">
          <img
            src={navImage}
            alt="Descripción de la imagen"
            style={{
              height: "50px",
              width: "50px",
              objectFit: "cover",
              marginRight: "0.5rem",
            }}
          />
          <h2 className="text-4xl font-black text-[#3f4235]">SISMOTRACK</h2>
        </div>
        <button
          className="block lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <div className="h-1 w-5 bg-[#3f4235] my-1"></div>
          <div className="h-1 w-5 bg-[#3f4235] my-1"></div>
          <div className="h-1 w-5 bg-[#3f4235] my-1"></div>
        </button>
        <ul
          className={`transition-transform transform origin-top ${
            isMenuOpen ? "scale-y-100" : "scale-y-0"
          } lg:scale-y-100 absolute lg:relative top-full left-0 w-full lg:w-auto bg-[#d0c7b1] lg:bg-transparent lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}
        >
          {" "}
          <li>
            <Link
              onClick={handleLinkClick}
              className="text-white p-2 rounded hover:bg-[#3f4235] block text-center"
              to="/"
            >
              INICIO
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLinkClick}
              className="text-white p-2 rounded hover:bg-[#3f4235] block text-center"
              to="/sismos"
            >
              SISMOS
            </Link>
          </li>
        </ul>
      </nav>

      <main
        className="p-10 flex-grow sm:overflow-scroll"
        style={{ overflowX: "auto" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
