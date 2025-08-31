import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Portfolio() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
    }, [navigate]);

    return (
        <div className="portfolio-welcome">
            <h2>Welcome to My Portfolio</h2>
            <div className="portfolio-content">
                <p>Hello! I'm MAHAVARSHNI S, a passionate developer.</p>
                <p>Use the navigation bar above to explore different sections of my portfolio:</p>
                <ul className="portfolio-sections">
                    <li><strong>About:</strong> Learn more about me and my background</li>
                    <li><strong>Projects:</strong> View my latest projects and work</li>
                    <li><strong>Skills:</strong> See my technical skills and expertise</li>
                    <li><strong>Contact:</strong> Get in touch with me</li>
                </ul>
            </div>
        </div>
    );
}

export default Portfolio;
