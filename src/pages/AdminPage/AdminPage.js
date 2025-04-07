import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import AdminHeader from "./AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./AdminPage.css";

function AdminPage() {
  const [isMenuToggleOpen, setMenuToggleOpen] = useState(false);
  const setToggle = () => setMenuToggleOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMenuToggleOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="admin-page-container">
      <div className="admin-page">
        <div className="admin-page__header">
          <div className="admin-page__header--menu-toggle" onClick={setToggle}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <AdminHeader />
        </div>
        <div
          className={`admin-page__content ${
            isMenuToggleOpen ? "menu-open" : ""
          }`}
        >
          <Outlet />
        </div>
        <div className={`admin-page__nav ${isMenuToggleOpen ? "open" : ""}`}>
          <AdminNav />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
