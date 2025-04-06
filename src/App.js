import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutDefault from "./layout/LayoutDefault/LayoutDefault";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
