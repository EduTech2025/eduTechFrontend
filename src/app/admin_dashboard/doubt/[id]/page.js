'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
    ref,
    push,
    onChildAdded,
    onValue,
    update,
    get,
    set,
} from 'firebase/database';
import {useAuth} from "@/context/AuthContext";
import '@/styles/globals.css'

const SendIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="m22 2-11 11" />
    </svg>
);

export default function App() {
    const {  uuid } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const params = useParams();
    const doubtId = params?.id;

    const senderId = uuid;
    const receiverId = doubtId;
    const [chatId, setChatId] = useState( [receiverId, senderId].sort().join('_'))


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        setChatId(chatId)

        const chatRef = ref(db, `chats/${chatId}/messages`);

        // 1. First fetch all current messages once and set them (without duplicates)
        get(chatRef).then(snapshot => {
            const initialMessages = [];
            snapshot.forEach(child => {
                initialMessages.push({ ...child.val(), id: child.key });
            });
            setMessages(initialMessages);
        });

        // 2. Now listen for new incoming messages only
        const unsubscribe = onChildAdded(chatRef, (snapshot) => {
            const newMsg = snapshot.val();
            setMessages((prev) => {
                const exists = prev.some((m) => m.id === snapshot.key);
                if (!exists) {
                    return [...prev, { ...newMsg, id: snapshot.key }];
                }
                return prev;
            });
        });

        // 3. Typing status
        const otherTypingRef = ref(db, `chats/${chatId}/typing/${receiverId}`);
        const typingUnsub = onValue(otherTypingRef, (snap) => setTyping(snap.val()));

        // 4. Mark as read
        markMessagesRead().then(r => console.log(r));

        // Optional: Clean up
        return () => {
            typingUnsub(); // removes typing listener
            // No unsubscribe needed for `onChildAdded`, but you can if you refactor with `onValue` and `off`
        };
    }, []);

    const handleTyping = (e) => {
        setInput(e.target.value);
        const typingRef = ref(db, `chats/${chatId}/typing/${senderId}`);
        set(typingRef, true).then(r => console.log(r));
        setTimeout(() => set(typingRef, false), 2000);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const timestamp = Date.now();
        const newMessage = {
            sender_id: senderId,
            receiver_id: receiverId,
            message: input,
            timestamp,
            read: false,
        };

        await push(ref(db, `chats/${chatId}/messages`), newMessage);
        setInput('');

        await fetch('http://localhost:8000/student-dash/save-message/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage),
        });
    };

    const markMessagesRead = async () => {
        const msgRef = ref(db, `chats/${chatId}/messages`);
        const snapshot = await get(msgRef);
        snapshot.forEach((child) => {
            const msg = child.val();
            if (msg.receiver_id === senderId && !msg.read) {
                update(ref(db, `chats/${chatId}/messages/${child.key}`), {
                    read: true,
                });
            }
        });

        await fetch('http://localhost:8000/chat/mark-as-read/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: senderId }),
        });
    };

    return (
        <div className="flex flex-col h-[90vh] text-white max-w-4xl mx-auto font-sans">
            <header className="p-4 border-b border-white/10 shrink-0 flex justify-between items-center">

                <h1 className="text-xl font-bold text-center flex-1">Doubt Chat</h1>
            </header>

            <div className="flex-1 space-y-4 p-4 overflow-y-auto no-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                            msg.sender_id === senderId ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {msg.sender_id === receiverId && (
                            <div className="w-8 h-8 rounded-full bg-purple-600 shrink-0" />
                        )}

                        <div
                            className={`max-w-md p-3 rounded-2xl ${
                                msg.sender_id === senderId
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 rounded-br-none'
                                    : 'bg-white/10 rounded-bl-none'
                            }`}
                        >
                            <p className="text-sm">{msg.message}</p>
                            <span className="text-xs opacity-60 mt-1 block text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                                {msg.sender_id === senderId ? (
                                    <span className="ml-2 text-green-300">
                    {msg.read ? '✓✓' : '✓'}
                  </span>
                                ) : null}
              </span>
                        </div>

                        {msg.sender_id === senderId && (
                            <div className="w-8 h-8 rounded-full bg-indigo-500 shrink-0" />
                        )}
                    </div>
                ))}
                {typing && (
                    <p className="text-sm italic text-gray-500">User is typing…</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 shrink-0">
                <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={handleTyping}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/10 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    <button
                        type="submit"
                        className="p-3 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <SendIcon />
                    </button>
                </form>
            </footer>
        </div>
    );
}
