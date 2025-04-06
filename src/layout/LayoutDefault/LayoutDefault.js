import { React, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HomeContent from "../../components/HomeContent/HomeContent";

import NavbarMiddle from "../../components/Header/NavbarMiddle";
import NavbarBottom from "../../components/Header/NavbarBottom";

import Footer1 from "../../components/Footer/Footer1";
import Footer2 from "../../components/Footer/Footer2";
import Footer3 from "../../components/Footer/Footer3";
import Line from "../../components/Line";

function LayoutDefault() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NavbarMiddle />
            <NavbarBottom />

            {/* <Outlet /> */}
            <HomeContent />

            <Footer1 />
            <Line />
            <Footer2 />
            <Line />
            <Footer3 />
        </>
    );
}

export default LayoutDefault;