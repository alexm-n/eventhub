import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRegistrations, getParticipants, createRegistration } from '../services/api';
import api from '../services/api';

export default function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, regRes, partRes] = await Promise.all([
                    api.get(`/events/${id}/`),
                    getRegistrations(),
                    getParticipants()
                ]);
                setEvent(eventRes.data);
                setRegistrations(regRes.data.filter(r => r.event === parseInt(id)));
                setParticipants(partRes.data);
            } catch (err) {
                setError('Erreur de chargement');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleRegister = async () => {
        try {
            await createRegistration({ participant: selectedParticipant, event: id });
            const regRes = await getRegistrations();
            setRegistrations(regRes.data.filter(r => r.event === parseInt(id)));
        } catch (err) {
            setError('Erreur lors de l\'inscription');
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (!event) return <p>Événement introuvable</p>;

    const registeredIds = registrations.map(r => r.participant);
    const registeredParticipants = participants.filter(p => registeredIds.includes(p.id));

    return (
        <div style={{ padding: 20 }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Status : {event.status}</p>
            <p>Date : {new Date(event.date).toLocaleString()}</p>

            <h3>Participants inscrits</h3>
            {registeredParticipants.length === 0
                ? <p>Aucun participant</p>
                : <ul>{registeredParticipants.map(p => <li key={p.id}>{p.name} — {p.email}</li>)}</ul>
            }

            <h3>Inscrire un participant</h3>
            <select value={selectedParticipant} onChange={e => setSelectedParticipant(e.target.value)}>
                <option value="">Choisir un participant</option>
                {participants.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
            <button onClick={handleRegister} style={{ marginLeft: 10 }}>Inscrire</button>
        </div>
    );
}