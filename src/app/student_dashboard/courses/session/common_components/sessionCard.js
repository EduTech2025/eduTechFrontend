'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SessionCardList = ({ sessions = [], onEdit, onDelete }) => {
    const router = useRouter();

    const handleCardClick = (session) => {
        sessionStorage.setItem('selectedSession', JSON.stringify(session));
        router.push(`/admin_dashboard/courses/session/${session.session_id}`);
    };

    return (
        <div className="flex overflow-x-auto gap-6 no-scrollbar px-4 py-2">
            {sessions.map((session) => (
                <div
                    key={session.session_id}
                    className="min-w-[300px] max-w-[300px] shrink-0 relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-xl p-5 text-white flex flex-col justify-between transition hover:scale-[1.02]"
                >
                    <div onClick={() => handleCardClick(session)} className="cursor-pointer">
                        {session.img_url && (
                            <img
                                src={session.img_url}
                                alt={session.session_name}
                                className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10"
                            />
                        )}

                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold mb-1">{session.session_name}</h3>
                            <p className="text-sm text-white/70 line-clamp-2">{session.description}</p>

                            <div className="flex flex-wrap gap-2 mt-auto text-xs mt-3">
                                {session.release_date && (
                                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                    {session.release_date}
                  </span>
                                )}
                                {session.session_index !== null && (
                                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    #{session.session_index}
                  </span>
                                )}
                                <span
                                    className={`px-3 py-1 rounded-full ${
                                        session.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                    }`}
                                >
                  {session.is_active ? 'Active' : 'Inactive'}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-4">
                        <button
                            onClick={() => onEdit(session)}
                            className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-blue-400 transition"
                            title="Edit"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(session)}
                            className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-red-400 transition"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SessionCardList;
