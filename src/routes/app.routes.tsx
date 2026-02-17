import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../components/templates/DefaultLayout";
import Home from "../pages/Home";
import ProductsTemplate from "../components/templates/Product";
import RawMaterialsTemplate from "../components/templates/RawMaterial";
import ProductionTemplate from "../components/templates/Production";
import AssociationsTemplate from "../components/templates/Associations";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsTemplate />} />
        <Route path="/raw-materials" element={<RawMaterialsTemplate />} />
        <Route path="/production" element={<ProductionTemplate />} />
        <Route path="/associations" element={<AssociationsTemplate />} />
      </Route>
    </Routes>
  );
};
