import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userActions } from "../redux/userReducer";

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex w-full flex-shrink-0 items-center justify-between bg-primary px-4 pt-2 text-background sm:h-screen sm:w-[200px] sm:flex-col sm:items-stretch sm:px-0 sm:pt-4">
      <div className="text-center text-xl font-bold sm:mb-12">Domains</div>
      <div className="flex gap-4 divide-primary-light border-primary-light sm:flex-col sm:gap-0 sm:divide-y-2 sm:border-y-2">
        {items.map((i) => (
          <Link
            className={`${location.pathname === i.href ? "bg-primary-light" : ""} w-full p-2 text-center sm:block`}
            to={i.href}
            key={i.name}
          >
            {i.name}
          </Link>
        ))}
      </div>

      <div className="hidden flex-1 sm:block"></div>

      <button onClick={handleLogout} className="sm:bg-primary-dark sm:py-2">
        Logout
      </button>
    </aside>
  );
}
export default Sidebar;
