import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth children={<RootLayout />} />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
