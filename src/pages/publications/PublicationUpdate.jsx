import { useState, useEffect } from 'react'
import { UpdatePublication } from "../../components/publications/PublicationUpdate"
import videoUpdate from "../../assets/vid/FondoUpdateUser.mp4"
import PrivateRoutes from "../../components/PrivateRoutes"
import { Navbar } from "../../components/navbars/Navbar"
import { getCourses } from "../../services"

export const UpdatePublicationPage = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses()
                setCourses(response.courses)
            } catch (error) {
                console.error("Error al obtener los cursos:", error)
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="update-publication-page">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoUpdate} type="video/mp4" />
                </video>
            </div>
            <Navbar />
            <div className="settings-container">
                <br />
                <br />
                <br />
                {courses.length > 0 ? (
                    <UpdatePublication courses={courses} />
                ) : (
                    <p>Cargando cursos...</p>
                )}
            </div>
            <PrivateRoutes />
        </div>
    )
}
