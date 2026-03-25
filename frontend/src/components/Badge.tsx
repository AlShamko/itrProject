import styled from "styled-components";

interface BadgeProps {
    isPublic: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const Badge = ({isPublic, children, onClick, className}: BadgeProps) => (
    <StyledBadge
        $isPublic={isPublic}
        onClick={onClick}
        className={className}
    >
        {children}
    </StyledBadge>
);

const StyledBadge = styled.span<{ $isPublic: boolean }>`
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    background: ${(props) =>
        props.$isPublic
            ? props.theme.primary + "20"
            : props.theme.secondary + "20"};
    color: ${(props) =>
        props.$isPublic ? props.theme.primary : props.theme.secondary};
    border: 1px solid ${(props) =>
        props.$isPublic ? props.theme.primary : props.theme.secondary};
`;
