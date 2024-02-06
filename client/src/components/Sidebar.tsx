import { Link } from "react-router-dom";

function Sidebar() {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Add",
      href: "/add",
    },
  ];

  const isLogged = false;

  return (
    <aside className="text-background bg-primary flex h-screen w-[200px] flex-col pt-4">
      <div className="mb-12 text-center text-xl font-bold">Domains</div>
      <div className="divide-primary-light border-primary-light divide-y-2 border-y-2">
        {items.map((i) => (
          <Link
            className="hover:bg-primary-light block w-full py-2 text-center transition-colors"
            to={i.href}
            key={i.name}
          >
            {i.name}
          </Link>
        ))}
      </div>

      <div className="flex-1"></div>

      {true && <button className="bg-primary-dark py-2">Logout</button>}
    </aside>
  );
}
export default Sidebar;
