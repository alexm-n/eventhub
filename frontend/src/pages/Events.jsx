import { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ title: '', description: '', date: '', status: 'upcoming' });
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const params = statusFilter ? `?status=${statusFilter}` : '';
            const res = await getEvents(params);
            setEvents(res.data);
        } catch (err) {
            setError('Erreur de chargement');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [statusFilter]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createEvent(form);
            setForm({ title: '', description: '', date: '', status: 'upcoming' });
            fetchEvents();
        } catch (err) {
            setError('Erreur lors de la création');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id);
            fetchEvents();
        } catch (err) {
            setError('Erreur lors de la suppression');
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Événements</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">Tous</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
            </select>

            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <span onClick={() => navigate(`/events/${event.id}`)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {event.title} — {event.status}
                        </span>
                        <button onClick={() => handleDelete(event.id)} style={{ marginLeft: 10 }}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <h3>Créer un événement</h3>
            <form onSubmit={handleCreate}>
                <input placeholder="Titre" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ display: 'block', marginBottom: 8 }} />
                <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ display: 'block', marginBottom: 8 }} />
                <input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ display: 'block', marginBottom: 8 }} />
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ display: 'block', marginBottom: 8 }}>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="finished">Finished</option>
                </select>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}