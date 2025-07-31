'use client';
import React, { useEffect, useState } from 'react';
import courseApi from '@/lib/courses';
import Toast from '@/utils/toast';

const AddCourseForm = ({ onClose, courseData = null, onSave }) => {
    const [formData, setFormData] = useState({
        course_name: '',
        duration: '',
        description: '',
        img_url: '',
        isactive: true,
    });

    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

    useEffect(() => {
        if (courseData) {
            setFormData(courseData);
        }
    }, [courseData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = courseData
            ? await courseApi.update_course(courseData.id, formData)
            : await courseApi.add_course(formData);

        if (response.status === 201 || response.status === 200) {
            setToast({ visible: true, message: courseData ? 'Course updated!' : 'Course added!', type: 'success' });
            onSave?.();
            setTimeout(onClose, 1200);
        } else {
            setToast({ visible: true, message: 'Something went wrong', type: 'error' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    type="text"
                    name="course_name"
                    value={formData.course_name}
                    onChange={handleChange}
                    placeholder="Course Name"
                    className="p-2 rounded bg-white/10 text-white"
                    required
                />
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                    className="p-2 rounded bg-white/10 text-white"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="p-2 rounded bg-white/10 text-white"
                    required
                />
                <input
                    type="text"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="p-2 rounded bg-white/10 text-white"
                />
                <label className="text-white flex gap-2 items-center">
                    <input
                        type="checkbox"
                        name="isactive"
                        checked={formData.isactive}
                        onChange={handleChange}
                    />
                    Active
                </label>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
                >
                    {courseData ? 'Update Course' : 'Add Course'}
                </button>
            </form>

            {toast.visible && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, visible: false })}
                />
            )}
        </>
    );
};

export default AddCourseForm;
