import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) => {
    const base =
      "px-4 py-2 rounded-lg transition-colors duration-200 font-medium";
    return isActive(path)
      ? `${base} bg-blue-600 text-white`
      : `${base} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Autoflex
            </Link>
          </div>

          <div className="flex space-x-2">
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
            <Link to="/products" className={linkClasses("/products")}>
              Products
            </Link>
            <Link to="/raw-materials" className={linkClasses("/raw-materials")}>
              Raw Materials
            </Link>
            <Link to="/associations" className={linkClasses("/associations")}>
              Associations
            </Link>
            <Link to="/production" className={linkClasses("/production")}>
              Production
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
