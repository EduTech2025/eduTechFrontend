'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function SessionDetailsPage() {
    const { id } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('selectedSession');
        if (data) {
            const parsed = JSON.parse(data);
            if (String(parsed.session_id) === String(id)) {
                setSession(parsed);
            }
        }
    }, [id]);

    const getIframeUrl = (url) => {
        if (!url) return '';
        const match = url.match(
            /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url; // fallback for non-YouTube
    };

    if (!session) {
        return <div className="text-white p-10">Loading session...</div>;
    }

    return (
        <div className="p-10 text-white bg-black min-h-screen">
            <h1 className="text-3xl font-bold mb-6">{session.session_name}</h1>

            {/* YouTube or fallback iframe */}
            {session.session_url ? (
                <iframe
                    src={`${getIframeUrl(session.session_url)}?modestbranding=1&rel=0&showinfo=0`}
                    title="Session Video"
                    className="w-full h-[400px] rounded-xl mb-6 border border-white/10"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

            ) : (
                <p className="mb-6 text-red-400">No session video provided.</p>
            )}

            {/* Image */}
            {session.img_url && (
                <img
                    src={session.img_url}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-white/10"
                    alt={session.session_name}
                />
            )}

            {/* Description */}
            <p className="mb-4 text-white/70">{session.description}</p>

            {/* Metadata */}
            <div className="text-sm space-y-2">
                <div>Release Date: {session.release_date}</div>
                <div>Start Time: {session.start_time}</div>
                <div>End Time: {session.end_time}</div>
                <div>Status: {session.is_active ? 'Active' : 'Inactive'}</div>
            </div>
        </div>
    );
}
