import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
