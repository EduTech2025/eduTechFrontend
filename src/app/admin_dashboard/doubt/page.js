'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
    Listbox,
    ListboxItem,
    Avatar,
    Button,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/context/LocalStorage';

const ListboxWrapper = ({ children }) => (
    <div className="w-full backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg rounded-xl p-4">
        {children}
    </div>
);

const ITEMS_PER_PAGE = 10;

export default function UserListBox() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = getToken();
            try {
                const res = await fetch('http://localhost:8000/api/users/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const paginatedUsers = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return users.slice(start, start + ITEMS_PER_PAGE);
    }, [users, page]);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    return (
        <ListboxWrapper>
            <Listbox
                classNames={{
                    base: 'w-full',
                    list: 'max-h-[300px] overflow-y-auto sno-scrollbar bg-white/10 backdrop-blur rounded-lg p-1',
                }}
                items={paginatedUsers}
                label="Users"
                selectionMode="none" // ❌ disables selection/tick
                variant="flat"
                key={`users-page-${page}`}
            >
                {(item) => (
                    <ListboxItem
                        key={item?.id ?? item?.email ?? JSON.stringify(item)}
                        textValue={item.name || item.email}
                        onClick={() => router.push(`/admin_dashboard/doubt/${item.uuid}`)}
                        className="hover:bg-white/20 cursor-pointer rounded-lg"
                    >
                        <div className="flex gap-2 items-center">
                            <Avatar
                                alt={item.name}
                                className="flex-shrink-0"
                                size="sm"
                                src={`https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png`}
                            />
                            <div className="flex flex-col">
                                <span className="text-small text-white">{item.name}</span>
                                <span className="text-tiny text-white/70">{item.email}</span>
                            </div>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-2 px-2">
                <Button
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="backdrop-blur bg-white/10 hover:bg-white/20 text-white"
                >
                    Previous
                </Button>
                <span className="text-tiny text-white/70">
                    Page {page} of {totalPages}
                </span>
                <Button
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="backdrop-blur bg-white/10 hover:bg-white/20 text-white"
                >
                    Next
                </Button>
            </div>
        </ListboxWrapper>
    );
}
