'use client';
import React, { useState } from 'react';
import AddCourseModal from './common_components/dialogBox';
import AllCoursesPage from './common_components/courseListing';

export default function CoursesPage() {
    const [editCourse, setEditCourse] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = () => {
        setRefreshFlag(prev => !prev);  // trigger refresh in AllCoursesPage
        setEditCourse(null);
        setIsModalOpen(false);
    };

    const handleEdit = (course) => {
        setEditCourse(course);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen  text-white px-10 py-4 overflow-auto no-scrollbar">
            <AddCourseModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                courseToEdit={editCourse}
                onSave={handleSave}
            />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Courses</h1>
                <button
                    onClick={() => {
                        setEditCourse(null);
                        setIsModalOpen(true);
                    }}
                    className="px-5 py-2 bg-white/10 text-white rounded-lg border border-white/20 backdrop-blur hover:bg-white/20 transition"
                >
                    + Add Course
                </button>
            </div>
            <AllCoursesPage onEdit={handleEdit} refreshFlag={refreshFlag} />
        </div>
    );
}
