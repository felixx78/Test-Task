import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  return user.username ? children : <Navigate to="/login" />;
}
export default RequireAuth;
