import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Autoflex</h2>
            <p className="text-gray-600 text-sm">
              Sistema de controle de estoque.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/raw-materials"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Raw Materials
                </Link>
              </li>
              <li>
                <Link
                  to="/production"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Production
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Informações</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Versão 1.0.0</li>
              <li>Desenvolvido com React + Vite</li>
              <li>© {new Date().getFullYear()} Autoflex</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Autoflex. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
