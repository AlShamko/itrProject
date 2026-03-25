import styled from "styled-components";
import type {AdminUser} from "../types/user";

interface UserRowProps {
    user: AdminUser;
    isSelected: boolean;
    onSelect: () => void;
    index: number;
}

export const UserRow = ({user, isSelected, onSelect, index}: UserRowProps) => {
    const statusLabel = user.status
        ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
        : "Active";

    const isActive = !user.status || user.status === "active";

    return (
        <Row $isSelected={isSelected}>
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
                <StatusBadge $isActive={isActive}>{statusLabel}</StatusBadge>
            </td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
        </Row>
    );
};

const Row = styled.tr<{ $isSelected: boolean }>`
  background-color: ${(props) =>
    props.$isSelected ? "rgba(144, 255, 144, 0.2)" : "transparent"};

  &:hover {
    background-color: rgba(144, 255, 144, 0.1);
  }
`;

const StatusBadge = styled.span<{ $isActive: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => (props.$isActive ? "#2e7d32" : "#d32f2f")};
  color: white;
`;
