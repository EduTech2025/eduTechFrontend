'use client';

import React from 'react';
import AddSessionForm from './addsession';

const AddSessionModal = ({ isOpen, setIsOpen, sessionToEdit, onSave, courseId }) => {
    const handleClose = () => setIsOpen(false);

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/20 relative">
                <button onClick={handleClose} className="absolute top-4 right-4 text-white text-xl hover:text-red-400">×</button>
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    {sessionToEdit ? 'Edit Session' : 'Add New Session'}
                </h2>
                <AddSessionForm onClose={handleClose} onSave={onSave} sessionData={sessionToEdit} courseId={courseId} />
            </div>
        </div>
    ) : null;
};

export default AddSessionModal;
