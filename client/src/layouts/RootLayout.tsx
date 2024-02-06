import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <div className="bg-background text-copy flex min-h-screen">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default RootLayout;
