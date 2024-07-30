import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewSongPage from "./pages/ViewSongPage";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage></HomePage>}></Route>
                    <Route path="/home" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="/viewsong/:id"
                        element={<ViewSongPage></ViewSongPage>}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
