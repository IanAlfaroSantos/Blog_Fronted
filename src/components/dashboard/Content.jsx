import { Route, Routes } from "react-router-dom";
import { Settings } from "../settings/Settings";

export const Content = () => {
    return (
        <div className="content-container">
            <Routes>
                <Route path='settings' element={<Settings />} />
            </Routes>
        </div>
    )
}