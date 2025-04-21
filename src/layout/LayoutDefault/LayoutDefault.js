import { useLocation, useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarBottom from "../../pages/Home/Header/NavbarBottom";
import NavbarMiddle from "../../pages/Home/Header/NavbarMiddle";
import Footer1 from "../../pages/Home/Footer/Footer1";
import Footer2 from "../../pages/Home/Footer/Footer2";
import Footer3 from "../../pages/Home/Footer/Footer3";
import Line from "../../pages/Home/Line";
import CustomAlert from "../../components/Alert/customAlert";

function LayoutDefault() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);

      navigate(location.pathname, { replace: true, state: {} });

      const timeout = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  return (
    <>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <NavbarMiddle />
      <NavbarBottom />

      <Outlet />
      {/* <HomeContent /> */}

      <Footer1 />
      <Line />
      <Footer2 />
      <Line />
      <Footer3 />
    </>
  );
}

export default LayoutDefault;
