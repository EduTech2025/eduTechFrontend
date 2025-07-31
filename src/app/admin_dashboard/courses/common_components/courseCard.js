'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

const CourseCardList = ({
                            courses = [],
                            onEdit = (course) => alert('Edit ' + course.course_name),
                            onDelete = (course) => alert('Delete ' + course.course_name),
                        }) => {
    const router = useRouter();
    const handleNavigateToSession = (course) => {
        sessionStorage.setItem('selectedCourse', JSON.stringify(course));
        router.push('courses/session'); // Adjust path if needed
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
                <div
                    key={course.id}
                    className="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-xl p-5 text-white flex flex-col justify-between transition hover:scale-[1.02]"
                >
                    <div  onClick={() => handleNavigateToSession(course)}>
                    {/* Image */}
                    {course.img_url && (
                        <img
                            src={course.img_url}
                            alt={course.course_name}
                            className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10"
                        />
                    )}

                    {/* Course Info */}
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-1 text-white">{course.course_name}</h3>
                        <p className="text-sm text-white/70 mb-3 line-clamp-3">{course.description}</p>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap mt-auto">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">
                {course.duration}
              </span>
                            {course.isactive ? (
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300">
                  Active
                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-300">
                  Inactive
                </span>
                            )}
                        </div>
                    </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-4">
                        <button
                            onClick={() => onEdit(course)}
                            className="p-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-blue-400 transition"
                            title="Edit"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(course)}
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

export default CourseCardList;
