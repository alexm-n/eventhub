import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <nav style={{ background: '#333', padding: '10px 20px', display: 'flex', gap: 20, alignItems: 'center' }}>
            <span onClick={() => navigate('/dashboard')} style={{ color: 'white', cursor: 'pointer' }}>Dashboard</span>
            <span onClick={() => navigate('/events')} style={{ color: 'white', cursor: 'pointer' }}>Événements</span>
            <span onClick={() => navigate('/participants')} style={{ color: 'white', cursor: 'pointer' }}>Participants</span>
            <span onClick={handleLogout} style={{ color: 'white', cursor: 'pointer', marginLeft: 'auto' }}>Déconnexion</span>
        </nav>
    );
}