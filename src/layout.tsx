import Navbar from "./components/organisms/Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
