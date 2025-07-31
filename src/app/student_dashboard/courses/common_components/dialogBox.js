'use client';
import React from 'react';
import AddCourseForm from './addcourse';

const AddCourseModal = ({ isOpen, setIsOpen, courseToEdit = null, onSave }) => {
    const handleClose = () => {
        setIsOpen(false);
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-3xl mx-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white text-xl hover:text-red-400"
                >
                    ×
                </button>
                <h2 className="text-3xl font-bold mb-6 text-center text-white/90">
                    {courseToEdit ? 'Edit Course' : 'Add New Course'}
                </h2>
                <AddCourseForm
                    onClose={handleClose}
                    courseData={courseToEdit}
                    onSave={onSave}
                />
            </div>
        </div>
    ) : null;
};

export default AddCourseModal;
