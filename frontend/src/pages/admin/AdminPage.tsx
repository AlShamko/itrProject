import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import { useLogto } from "@logto/react";
import { Unlock, Trash2, UserX } from "lucide-react";
import api from "../../api/axios.ts";
import { TableRow } from "./TableRow.tsx";
import type { User } from "../../types/user.ts";

export const AdminPage = () => {
    const { getAccessToken, signOut, fetchUserInfo } = useLogto();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const isAnySelected = selectedIds.length > 0;

    const requestWithToken = useCallback(async (method: string, url: string, data?: unknown) => {
        const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCES);
        return api.request({
            method,
            url,
            data,
            headers: { Authorization: `Bearer ${token}` }
        });
    }, [getAccessToken]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await requestWithToken('GET', '/users');
                setUsers(response.data);
            } catch (err) {
                console.error("Fetch failed", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [requestWithToken]);

    const checkSelfAction = async (ids: number[]) => {
        const userInfo = await fetchUserInfo();
        if (userInfo?.sub && ids.includes(Number(userInfo.sub))) {
            alert("Your account status has changed. Logging out...");
            await signOut(window.location.origin);
            return true;
        }
        return false;
    };

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
        if (!selectedIds.length || !window.confirm("Delete selected users?")) return;

        try {
            await requestWithToken('DELETE', '/users', { ids: selectedIds });

            if (await checkSelfAction(selectedIds)) return;

            setUsers(prev => prev.filter(user => !selectedIds.includes(user.id)));
            setSelectedIds([]);
        } catch (error) {
            console.error('Delete failed:', error);
            alert("Delete failed.");
        }
    };

    const handleStatusChange = async (newStatus: 'active' | 'blocked') => {
        if (!selectedIds.length) return;

        try {
            await requestWithToken('PATCH', '/users/status', {
                ids: selectedIds,
                status: newStatus
            });

            if (newStatus === 'blocked' && await checkSelfAction(selectedIds)) return;

            setUsers(prev => prev.map(user =>
                selectedIds.includes(user.id) ? { ...user, status: newStatus } : user
            ));
            setSelectedIds([]);
        } catch (error) {
            console.error('Status update failed:', error);
            alert("Status update failed");
        }
    };

    if (isLoading) return <StyledContainer>Loading users...</StyledContainer>;

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
                    title="Delete unverified (blocked)"
                    disabled={users.length === 0}
                    onClick={async () => {
                        if (window.confirm("Delete all blocked users?")) {
                            try {
                                await requestWithToken('DELETE', '/users/unverified');
                                const response = await requestWithToken('GET', '/users');
                                setUsers(response.data);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }}
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
                        <TableRow
                            key={user.id}
                            user={user}
                            index={idx + 1}
                            isSelected={selectedIds.includes(user.id)}
                            onSelect={() => toggleSelect(user.id)}
                        />
                    ))}
                </tbody>
            </StyledTableWrap>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`padding: 20px;`;
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
    cursor: pointer;
    &:disabled { background: #e9ecef; color: #adb5bd; cursor: not-allowed; }
`;
const StyledIconButton = styled.button<{ $danger?: boolean }>`
    display: flex; align-items: center; justify-content: center;
    padding: 6px; background: white; border: 1px solid #ddd; border-radius: 4px;
    color: ${props => props.$danger ? '#dc3545' : '#495057'};
    cursor: pointer;
    &:disabled { color: #adb5bd; cursor: not-allowed; }
`;
const StyledTableWrap = styled.table`
    width: 100%; border-collapse: collapse;
    th, td { padding: 10px 12px; border: 1px solid #ddd; text-align: left; }
    th { background-color: #f5f5f5; }
`;