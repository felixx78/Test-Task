import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-copy sm:flex-row">
      <Sidebar />
      <main className="w-full sm:pl-[200px]">
        <Outlet />
        <ToastContainer hideProgressBar autoClose={1500} />
      </main>
    </div>
  );
}
export default RootLayout;
