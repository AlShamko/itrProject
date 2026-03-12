import styled from "styled-components";
import {Link} from "react-router-dom";

export const AdminButton = () => {
    return (
        <StyledAdminLink to="/admin">Admin</StyledAdminLink>
    );
};


const StyledAdminLink = styled(Link)`
    text-decoration: none;
    width: 50px;
    font-size: 1rem;
    padding: 6px 8px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.body};
    }
`;
