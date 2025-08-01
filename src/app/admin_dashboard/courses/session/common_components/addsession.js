'use client';

import React, { useState, useEffect } from 'react';
import Toast from '@/utils/toast';
import sessionApi from '@/lib/courses';
import courseApi from "@/lib/courses"; // create this file with CRUD logic

const AddSessionForm = ({ onClose, onSave, sessionData = null, courseId }) => {
    const [formData, setFormData] = useState({
        course: courseId,
        session_name: '',
        session_url: '',
        session_index: '',
        release_date: '',
        start_time: '',
        end_time: '',
        description: '',
        img_url: '',
        updated_by:"himanhsu",
        is_active: true,
    });

    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

    useEffect(() => {
        if (sessionData) setFormData(sessionData);
    }, [sessionData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            course: courseId,
            updated_by: "himanshu"
        };
        let response;

        if (sessionData) {
            response = await courseApi.update_session(sessionData.session_id, payload);
        } else {
            response = await courseApi.add_session(payload);
        }

        if (response.status === 200 || response.status === 201) {
            setToast({ visible: true, message: 'Saved successfully!', type: 'success' });
            onSave?.();
            setTimeout(onClose, 1200);
        } else {
            setToast({ visible: true, message: 'Failed to save', type: 'error' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input name="session_name" value={formData.session_name} onChange={handleChange} placeholder="Session Name" className="p-2 bg-white/10 rounded text-white" />
                <input name="session_url" value={formData.session_url} onChange={handleChange} placeholder="Video URL" className="p-2 bg-white/10 rounded text-white" />
                <input name="session_index" value={formData.session_index} onChange={handleChange} type="number" placeholder="Session Index" className="p-2 bg-white/10 rounded text-white" />
                <input name="release_date" value={formData.release_date} onChange={handleChange} type="date" className="p-2 bg-white/10 rounded text-white" />
                <input name="start_time" value={formData.start_time} onChange={handleChange} type="time" className="p-2 bg-white/10 rounded text-white" />
                <input name="end_time" value={formData.end_time} onChange={handleChange} type="time" className="p-2 bg-white/10 rounded text-white" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="p-2 bg-white/10 rounded text-white" />
                <input name="img_url" value={formData.img_url} onChange={handleChange} placeholder="Image URL" className="p-2 bg-white/10 rounded text-white" />
                <label className="text-white flex items-center gap-2">
                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                    Active
                </label>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mt-2">
                    {sessionData ? 'Update Session' : 'Add Session'}
                </button>
            </form>

            {toast.visible && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, visible: false })} />}
        </>
    );
};

export default AddSessionForm;
