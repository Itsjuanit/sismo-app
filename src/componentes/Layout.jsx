import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-slate-700 p-4 flex justify-between items-center">
        {" "}
        {/* Agregado flex, justify-between y items-center */}
        <h2 className="text-4xl font-black text-white">SISMOS</h2>{" "}
        {/* Removido text-center y mb-4 */}
        <ul className="flex space-x-4">
          {" "}
          {/* Removido justify-center */}
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
          {/* Agrega más enlaces aquí si es necesario */}
        </ul>
      </nav>
      <main className="p-10 flex-grow overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
