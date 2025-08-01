'use client';

import React, { useEffect, useState } from 'react';
import SessionCardList from './common_components/sessionCard';
import AddSessionModal from './common_components/sessionDialogBox';
import sessionApi from '@/lib/courses';
import { Loader2, Plus } from 'lucide-react';
import courseApi from "@/lib/courses";

const SessionsPage = () => {
    const [course, setCourse] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editSession, setEditSession] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('selectedCourse');
        if (data) {
            const parsed = JSON.parse(data);
            setCourse(parsed);
        }
    }, []);

    const fetchSessions = async () => {
        if (!course?.course_id) return;
        setLoading(true);
        const res = await courseApi.get_all_session(course.course_id);
        if (res.status === 200) {
            setSessions(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (course?.course_id) {
            fetchSessions();
        }
    }, [course]);

    const handleDelete = async (session) => {
        if (!confirm(`Delete "${session.session_name}"?`)) return;
        const res = await sessionApi.delete_session(session.session_id);
        if (res.status === 204) fetchSessions();
    };

    if (!course) {
        return (
            <div className="p-10 text-white h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-6 h-6 text-white/70" />
                <span className="ml-2">Loading course...</span>
            </div>
        );
    }

    return (
        <div className="p-10 text-white min-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{course.course_name} - Sessions</h1>
                <button
                    onClick={() => {
                        setEditSession(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    <Plus size={18} /> Add Session
                </button>
            </div>

            {/* 🔥 Don't wrap scroll container with extra flex/scroll */}
            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <Loader2 className="animate-spin w-6 h-6 text-white/70" />
                </div>
            ) : (
                <SessionCardList
                    sessions={sessions}
                    onEdit={(s) => {
                        setEditSession(s);
                        setIsModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            <AddSessionModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                sessionToEdit={editSession}
                onSave={fetchSessions}
                courseId={course.course_id}
            />
        </div>
    );
};

export default SessionsPage;
