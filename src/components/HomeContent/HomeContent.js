import { React, useEffect } from 'react'

import SlideSection1 from "../slideSection/SlideSection1";

import Line from "../Line";
import ContentHome2 from '../Popular/ContentHome2';
import BestSeller from "../BestSeller/BestSeller";
import HotProduct from "../HotProduct/HotProduct";
import Banner from "../Banner/Banner";
import CreateAccount from "../Createaccount/CreateAccount";
import MyCategory from "../myCategory/MyCategory";

function HomeContent() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>

            <SlideSection1 />
            <Line />
            <MyCategory />
            <HotProduct />
            <ContentHome2 />
            <Banner />
            <BestSeller />
            <CreateAccount />


        </>
    );
}

export default HomeContent