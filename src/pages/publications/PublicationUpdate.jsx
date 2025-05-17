import { UpdatePublication } from "../../components/publications/PublicationUpdate";
import videoUpdate from "../../assets/vid/FondoUpdateUser.mp4";
import PrivateRoutes from "../../components/PrivateRoutes";

export const UpdatePublicationPage = () => {
    return (
        <div className="update-publication-page">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoUpdate} type="video/mp4" />
                </video>
            </div>
            <UpdatePublication />
            <PrivateRoutes />
        </div>
    )
}