import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeContent from "./components/HomeContent/HomeContent";
import LayoutDefault from "./layout/LayoutDefault/LayoutDefault";



const Home = () => {

};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutDefault />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
