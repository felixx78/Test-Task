import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");

  return user ? children : <Navigate replace to="/login" />;
}
export default RequireAuth;
