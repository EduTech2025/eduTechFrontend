import api from "./base_url";

const endPoints = {
    course:"api/course/",
    session:"api/session/",
    chats_save:'dashboard/save-message/',
    chats_read:'dashboard/mark-as-read/',
}

const courseApi={
    add_course: async function (data) {
        try {
            const response = await api.post(endPoints.course, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            console.error('creation failed:', error);
            return { status: 500 }; // Optional: so your UI can still handle the error gracefully
        }
    },
    update_course: async function (id, data) {
        try {
            const response = await api.put(endPoints.course, {
                ...data,
                course_id: id,  // backend expects 'course_id' in body
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response;
        } catch (error) {
            console.error('Course update failed:', error);
            return { status: 500 };
        }
    },
    delete_course: async function (id) {
        try {
            const response = await api.delete(endPoints.course, {
                data: { course_id: id }, // Django expects course_id in body
                headers: { 'Content-Type': 'application/json' },
            });
            return response;
        } catch (error) {
            console.error('Course delete failed:', error);
            return { status: 500 };
        }
    },
    get_all_course: async function () {
        try {
            const response = await api.get(endPoints.course, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            console.error('Fetch failed:', error);
            return { status: 500, data: [] };
        }
    },
    add_session: async function (data) {
        try {
            const response = await api.post(endPoints.session, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            console.error('creation failed:', error);
            return { status: 500 }; // Optional: so your UI can still handle the error gracefully
        }
    },
    update_session: async function (id, data) {
        try {
            const response = await api.put(endPoints.session, {
                ...data,
                session_id: id,  // backend expects 'course_id' in body
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response;
        } catch (error) {
            console.error('Course update failed:', error);
            return { status: 500 };
        }
    },
    delete_session: async function (id) {
        try {
            const response = await api.delete(endPoints.session, {
                data: { session_id: id }, // Django expects course_id in body
                headers: { 'Content-Type': 'application/json' },
            });
            return response;
        } catch (error) {
            console.error('Course delete failed:', error);
            return { status: 500 };
        }
    },
    get_all_session: async function (courseId) {
        try {
            const response = await api.get(endPoints.session+"?course_id="+courseId, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            console.error('Fetch failed:', error);
            return { status: 500, data: [] };
        }
    },
    save_message: async function (newMessage) {
        try {
            const response = await api.post(
                endPoints.chats_save,
                newMessage,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.error('Message saving failed:', error);
            return { status: 500 };
        }
    },
    mark_as_read: async function (senderId) {
        try {
            const response = await api.post(
                endPoints.chats_read,
                { user_id: senderId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.error('Mark as read failed:', error);
            return { status: 500 };
        }
    }


}



export default courseApi;