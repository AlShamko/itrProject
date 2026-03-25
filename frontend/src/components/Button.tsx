import styled from "styled-components";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;

}

export const Button = ({children, onClick, type = "button", className}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            type={type}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${props => props.theme.body};
    }
`;