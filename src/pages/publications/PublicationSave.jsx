import { useState, useEffect } from 'react';
import { Navbar } from "../../components/navbars/Navbar";
import { Publication } from "../../components/publications/Publication";
import videoUpdateUser from "../../assets/vid/FondoUpdateUser.mp4";
import "../dashboard/dashboardPage.css";
import "../auth/authPage.css";
import { getCourses } from '../../services';
import PrivateRoutes from "../../components/PrivateRoutes";

export const PublicationSave = () => {
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await getCourses();
                setCourses(result);
                setLoadingCourses(false);
            } catch (error) {
                setLoadingCourses(false);
            }
        };

        fetchCourses();
    }, []);

    if (loadingCourses) {
        return <p>Loading courses...</p>;
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
                    <br />
                    <br />
                    <Publication courses={courses} />
                </div>
                <PrivateRoutes />
            </div>
        </div>
    );
};
