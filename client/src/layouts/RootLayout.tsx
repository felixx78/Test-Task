import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-copy sm:flex-row">
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
export default RootLayout;
