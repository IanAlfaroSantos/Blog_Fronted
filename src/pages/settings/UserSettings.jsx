import { useEffect, useState } from "react";
import { useUserSettings } from "../../shared/hooks";
import { UserSettings } from "../../components/users/UpdateSettings";
import { Navbar } from "../../components/navbars/Navbar";
import videoUpdateUser from "../../assets/vid/FondoUpdateUser.mp4";
import "../dashboard/dashboardPage.css";
import "../auth/authPage.css";
import PrivateRoutes from "../../components/PrivateRoutes";

export const UserSettingsUpdate = () => {
    const { userSettings, saveSettings, isFetching } = useUserSettings();

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="auth-container">
            <div className="dashboard-container">
                <div className="video-background">
                    <video autoPlay loop muted playsInline>
                        <source src={videoUpdateUser} type="video/mp4" />
                    </video>
                </div>
                <Navbar />
                <div className="settings-container">
                    { }
                    <br />
                    <br />
                    <br />
                    <UserSettings
                        initialSettings={userSettings}
                        onSave={saveSettings}
                    />
                </div>
                <PrivateRoutes />
            </div>
        </div>
    )
}