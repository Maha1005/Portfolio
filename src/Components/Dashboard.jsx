import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/dashboard", {
                    headers: {
                        'Authorization': token
                    }
                });
                setContent(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data");
                setLoading(false);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleEnterPortfolio = () => {
        navigate('/portfolio');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h2>Welcome to Your Dashboard</h2>
                <div className="dashboard-message">
                    {content.message && <p>{content.message}</p>}
                    <p>You have successfully logged in. Click the button below to enter your portfolio.</p>
                </div>
                <div className="dashboard-actions">
                    <button onClick={handleEnterPortfolio} className="enter-btn">
                        Enter to Portfolio
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;