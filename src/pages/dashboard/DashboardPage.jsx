import { Navbar } from "../../components/navbars/Navbar";
import videoDashboard from "../../assets/vid/FondoDashboard.mp4";
import { PublicationList } from "../../components/publications/PublicationList.jsx";
import "./dashboardPage.css";

export const DashboardPages = () => {
    return (
        <div className="dashboard-container">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoDashboard} type="video/mp4" />
                </video>
            </div>
            <Navbar />
            <PublicationList />
        </div>
    )
}