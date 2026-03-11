import styled from 'styled-components';
import {useLogto} from "@logto/react";
import {SearchForm} from "../../components/searchForm/SearchForm.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {Button} from "../../components/button/Button.tsx";
import { Link } from "react-router-dom";
// import {useState} from "react";

export const Header = () => {
    const {signIn, signOut, isAuthenticated} = useLogto();
    const handleSignIn = () => {
        signIn(`${window.location.origin}/callback`);
    };
    const handleSignOut = () => {
        signOut(window.location.origin);
    };
    // const [searchQuery, setSearchQuery] = useState('')
    //
    // const clearSearchQuery = searchQuery.trim().toLowerCase();
    // const filteredTable = clearSearchQuery.length > 0 ? clearSearchQuery : [];

    return (
        <StyledHeader>
            <Logo />
            <SearchForm
                // searchQuery= {searchQuery}
                // setSearchQuery = {setSearchQuery}
            />
            {isAuthenticated ? (
                <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
                <Button onClick={handleSignIn}>Sign In</Button>
            )}
            <StyledAdmin to="/admin">Admin</StyledAdmin>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    padding: 1rem 2rem;
    background-color: ${
        props => props.theme.headerBg
    };
    border-bottom: 1px solid ${
        props => props.theme.border
    };
`;

const StyledAdmin = styled(Link)`
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
    transition: 0.2s;

    &:hover {
        background-color: ${props => props.theme.body};
    }
`;


