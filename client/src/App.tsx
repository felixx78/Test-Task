import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Add from "./pages/Add";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<RequireAuth children={<RootLayout />} />}>
        <Route path=":page?" element={<Home />} />

        <Route path="add" element={<Add />} />
      </Route>
    </Routes>
  );
}

export default App;
