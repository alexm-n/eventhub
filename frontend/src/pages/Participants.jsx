import { useState, useEffect } from 'react';
import { getParticipants, createParticipant } from '../services/api';

export default function Participants() {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', email: '' });

    const fetchParticipants = async () => {
        try {
            const res = await getParticipants();
            setParticipants(res.data);
        } catch (err) {
            setError('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createParticipant(form);
            setForm({ name: '', email: '' });
            fetchParticipants();
        } catch (err) {
            setError('Erreur lors de la création');
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Participants</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {participants.map(p => (
                    <li key={p.id}>{p.name} — {p.email}</li>
                ))}
            </ul>

            <h3>Ajouter un participant</h3>
            <form onSubmit={handleCreate}>
                <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ display: 'block', marginBottom: 8 }} />
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ display: 'block', marginBottom: 8 }} />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}