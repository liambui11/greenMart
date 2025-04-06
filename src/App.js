import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutDefault from "./layout/LayoutDefault/LayoutDefault";

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
