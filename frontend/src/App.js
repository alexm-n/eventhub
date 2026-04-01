import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Participants from './pages/Participants';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                    <PrivateRoute>
                        <>
                            <Navbar />
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/events/:id" element={<EventDetail />} />
                                <Route path="/participants" element={<Participants />} />
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </>
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;