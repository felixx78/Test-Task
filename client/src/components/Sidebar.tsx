import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Add",
      href: "/add",
      authRequire: true,
    },
  ];

  const isLogged = true;

  return (
    <aside className="text-background bg-primary flex w-full items-center justify-between px-4 py-2 sm:h-screen sm:w-[200px] sm:flex-col sm:items-stretch sm:px-0 sm:pt-4">
      <div className="text-center text-xl font-bold sm:mb-12">Domains</div>
      <div className="divide-primary-light border-primary-light flex gap-4 sm:flex-col sm:gap-0 sm:divide-y-2 sm:border-y-2">
        {items.map((i) => {
          if (i.authRequire && !isLogged) return null;

          return (
            <Link
              className={`${location.pathname === i.href ? "bg-primary-light" : ""} w-full p-2 text-center sm:block`}
              to={i.href}
              key={i.name}
            >
              {i.name}
            </Link>
          );
        })}
      </div>

      <div className="hidden flex-1 sm:block"></div>

      {isLogged && (
        <button className="sm:bg-primary-dark sm:py-2">Logout</button>
      )}
    </aside>
  );
}
export default Sidebar;
