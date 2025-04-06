import { React, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarBottom from "../../pages/Home/Header/NavbarBottom";
import NavbarMiddle from "../../pages/Home/Header/NavbarMiddle"
import Footer1 from "../../pages/Home/Footer/Footer1";
import Footer2 from "../../pages/Home/Footer/Footer2";
import Footer3 from "../../pages/Home/Footer/Footer3";
import Line from "../../pages/Home/Line";

function LayoutDefault() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <>
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