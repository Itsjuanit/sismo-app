import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-slate-700 p-4 flex justify-between items-center">
        {" "}
        <h2 className="text-4xl font-black text-white">SISMOS</h2>{" "}
        <ul className="flex space-x-4">
          {" "}
          <li>
            <Link className="text-white p-2 rounded hover:bg-slate-600" to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link
              className="text-white p-2 rounded hover:bg-slate-600"
              to="/sismos"
            >
              Sismos
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
