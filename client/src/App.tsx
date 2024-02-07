import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<RequireAuth children={<RootLayout />} />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
