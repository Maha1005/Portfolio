import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

function Layout({ children }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('portfolio');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="layout-container">
            <div className='nav-div'>
                <h1 className='maha'>MAHAVARSHNI S</h1>
                <nav className='nav-bar'>
                    <Link 
                        to="/portfolio" 
                        className={activeTab === 'portfolio' ? 'active' : ''}
                        onClick={() => handleTabClick('portfolio')}
                    >
                        Portfolio
                    </Link>
                    <Link 
                        to="/About" 
                        className={activeTab === 'about' ? 'active' : ''}
                        onClick={() => handleTabClick('about')}
                    >
                        About
                    </Link>
                    <Link 
                        to="/Projects" 
                        className={activeTab === 'projects' ? 'active' : ''}
                        onClick={() => handleTabClick('projects')}
                    >
                        Projects
                    </Link>
                    <Link 
                        to="/Skills" 
                        className={activeTab === 'skills' ? 'active' : ''}
                        onClick={() => handleTabClick('skills')}
                    >
                        Skills
                    </Link>
                    <Link 
                        to="/Contact" 
                        className={activeTab === 'contact' ? 'active' : ''}
                        onClick={() => handleTabClick('contact')}
                    >
                        Contact
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </nav>
            </div>
            <div className="layout-content">
                {children}
            </div>
        </div>
    )
}

export default Layout;