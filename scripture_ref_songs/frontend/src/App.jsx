import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage></HomePage>}></Route>
                    <Route path="/home" element={<HomePage></HomePage>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
