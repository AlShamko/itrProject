import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Unlock, Trash2, UserX} from "lucide-react";
import {useNavigate} from 'react-router-dom'
import {Users} from '../components/Users.tsx'

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created: string | Date;
    status: 'active' | 'blocked' | string;
}

export const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const navigate = useNavigate();

    const isAnySelected = selectedIds.length > 0;

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === users.length && users.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(users.map(u => u.id));
        }
    };

    const handleDelete = async () => {
        if (!selectedIds.length) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users`, {
                data: {ids: selectedIds}
            });

            setUsers(prev => prev.filter(user => !selectedIds.includes(user.id)));
            setSelectedIds([]);
        } catch (err) {
            console.error("Delete failed", err);
            alert("Error deleting users");
        }
    };

    const handleStatusChange = async (newStatus: 'active' | 'blocked') => {
        if (!selectedIds.length) return;

        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/status`, {
                ids: selectedIds,
                status: newStatus
            });

            setUsers(prev => prev.map(user =>
                selectedIds.includes(user.id) ? {...user, status: newStatus} : user
            ));

            setSelectedIds([]);
        } catch (err) {
            console.error("Status update failed", err);
            alert("Failed to update status");
        }
    };

    const handleDeleteUnverified = async () => {
        if (!window.confirm("Delete all non-active users?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/unverified`);

            setUsers(prev => prev.filter(user => user.status === 'active'));
            alert("Cleanup complete!");
        } catch (err) {
            console.error("Cleanup failed", err);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchUsers = async () => {
            try {
                const email = localStorage.getItem('userEmail');

                const response = await axios.get<User[]>(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: {
                        'x-user-email': email
                    }
                });

                if (isMounted) {
                    setUsers(response.data);
                    setError(null);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    if (axios.isAxiosError(err)) {
                        if (err.response?.status === 401 || err.response?.status === 403) {
                            localStorage.clear();
                            navigate('/HomePage', {state: {message: 'Your account is blocked.'}});
                            return;
                        }
                        setError(err.message);
                    } else if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("Error");
                    }
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <StyledContainer>
            <StyledToolbar>
                <StyledBlockButton
                    disabled={!isAnySelected}
                    onClick={() => handleStatusChange('blocked')}
                >
                    Block
                </StyledBlockButton>

                <StyledIconButton
                    title="Unblock"
                    disabled={!isAnySelected}
                    onClick={() => handleStatusChange('active')}
                >
                    <Unlock size={18} />
                </StyledIconButton>

                <StyledIconButton
                    $danger
                    title="Delete"
                    disabled={!isAnySelected}
                    onClick={handleDelete}
                >
                    <Trash2 size={18} />
                </StyledIconButton>

                <StyledIconButton
                    title="Delete unverified"
                    disabled={users.length === 0}
                    onClick={handleDeleteUnverified}
                >
                    <UserX size={18} />
                </StyledIconButton>
            </StyledToolbar>

            <StyledTableWrap>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={toggleAll}
                                checked={selectedIds.length === users.length && users.length > 0}
                            />
                        </th>
                        <th>№</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <Users
                            key={user.id}
                            user={user}
                            index={idx}
                            isSelected={selectedIds.includes(user.id)}
                            onSelect={() => toggleSelect(user.id)}
                        />
                    ))}
                </tbody>
            </StyledTableWrap>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 20px;
`;

const StyledToolbar = styled.div`
    background: #f8f9fa;
    padding: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
`;

const StyledBlockButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 15px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
        background-color: #e9ecef;
        color: #adb5bd;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        opacity: 0.9;
    }
`;

const StyledIconButton = styled.button<{ $danger?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: ${props => props.$danger ? '#dc3545' : '#495057'};
    cursor: pointer;
    transition: all 0.2s;

    &:disabled {
        color: #adb5bd;
        border-color: #e9ecef;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: #f1f3f5;
        border-color: #adb5bd;
    }
`;

const StyledTableWrap = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 10px 12px;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f5f5f5;
    }
`;