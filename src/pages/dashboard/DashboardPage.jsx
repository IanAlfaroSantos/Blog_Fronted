import { Navbar } from "../../components/navbars/Navbar";
import videoDashboard from "../../assets/vid/FondoDashboard.mp4";
import "./dashboardPage.css"

export const DashboardPages = () => {
    return (
        <div className="dashboard-container">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoDashboard} type="video/mp4" />
                </video>
            </div>
            <Navbar />
        </div>
    )
}