import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import Home from "../pages/Home";
import ProductsTemplate from "../components/templates/Product";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsTemplate />} />
      </Route>
    </Routes>
  );
};
