import { Outlet, Link, useLocation } from "react-router-dom";
function Layout() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-purple-500 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">SISMOS</h2>
        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "text-purple-900" : "text-white"
            }text-2xl block mt-2 hover:text-purple-200`}
            to="/"
          >
            Sismos
          </Link>
        </nav>
      </aside>
      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
