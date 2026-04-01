import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            navigate('/events');
        } catch (err) {
            setError('Identifiants incorrects');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
            <h2>EventHub - Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10 }} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10 }} />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}