import { useState, useEffect } from 'react';
import { getEvents, getParticipants, getRegistrations } from '../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalParticipants: 0,
        totalRegistrations: 0,
        upcoming: 0,
        ongoing: 0,
        finished: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [eventsRes, participantsRes, registrationsRes] = await Promise.all([
                    getEvents(),
                    getParticipants(),
                    getRegistrations()
                ]);
                const events = eventsRes.data;
                setStats({
                    totalEvents: events.length,
                    totalParticipants: participantsRes.data.length,
                    totalRegistrations: registrationsRes.data.length,
                    upcoming: events.filter(e => e.status === 'upcoming').length,
                    ongoing: events.filter(e => e.status === 'ongoing').length,
                    finished: events.filter(e => e.status === 'finished').length,
                });
            } catch (err) {
                setError('Erreur de chargement');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
                    <h3>Événements</h3>
                    <p>Total : {stats.totalEvents}</p>
                    <p>Upcoming : {stats.upcoming}</p>
                    <p>Ongoing : {stats.ongoing}</p>
                    <p>Finished : {stats.finished}</p>
                </div>
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
                    <h3>Participants</h3>
                    <p>Total : {stats.totalParticipants}</p>
                </div>
                <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
                    <h3>Inscriptions</h3>
                    <p>Total : {stats.totalRegistrations}</p>
                </div>
            </div>
        </div>
    );
}