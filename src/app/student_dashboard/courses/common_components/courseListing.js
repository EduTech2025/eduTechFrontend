'use client';
import React, { useEffect, useState } from 'react';
import CourseCardList from './courseCard';
import courseApi from '@/lib/courses';
import { Loader2 } from 'lucide-react';

const AllCoursesPage = ({ onEdit, refreshFlag }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });


    const fetchCourses = async () => {
        setLoading(true);
        const resp = await courseApi.get_all_course();
        if (resp.status === 200) {
            setCourses(resp.data);
        } else {
            console.error('Error loading courses');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCourses();
    }, [refreshFlag]);

    const handleDelete = async (course) => {
        const confirmed = confirm(`Are you sure you want to delete "${course.course_name}"?`);
        if (!confirmed) return;

        const resp = await courseApi.delete_course(course.course_id);
        if (resp.status === 204) {
            setToast({ visible: true, message: 'Course deleted successfully!', type: 'success' });
            await fetchCourses(); // refresh after deletion
        } else {
            setToast({ visible: true, message: 'Failed to delete course', type: 'error' });
        }
    };

    return loading ? (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-white/70" />
        </div>
    ) : (
        <div className="h-screen overflow-auto no-scrollbar text-white px-10 py-2">
        <CourseCardList
            courses={courses}
            onEdit={onEdit}
            onDelete={handleDelete}
        />
        </div>
    );
};

export default AllCoursesPage;
