import styled from "styled-components";
import type {User} from "../pages/AdminPage.tsx";

interface TableRowProps {
    user: User;
    isSelected: boolean;
    onSelect: () => void;
    index: number;
}

interface StyledRowProps {
    $isSelected: boolean;
}

export const Users = ({user, isSelected, onSelect, index}: TableRowProps) => {
    return (
        <StyledRow $isSelected={isSelected}>
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                />
            </td>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <StatusBadge $isActive={!user.status || user.status === 'active'}>
                    {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                </StatusBadge>
            </td>
            <td>{new Date(user.created).toLocaleDateString()}</td>
        </StyledRow>
    );
};

const StyledRow = styled.tr<StyledRowProps>`
    background-color: ${props => props.$isSelected ? 'rgba(144, 255, 144, 0.2)' : 'transparent'};

    &:hover {
        background-color: rgba(144, 255, 144, 0.1);
    }
`;

const StatusBadge = styled.span<{ $isActive: boolean }>`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    background-color: ${props => props.$isActive ? '#2e7d32' : '#d32f2f'};
    color: white;
`;