import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;