import styled from 'styled-components';
import {useLogto} from "@logto/react";
import {SearchForm} from "../../components/searchForm/SearchForm.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {Button} from "../../components/button/Button.tsx";
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
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    padding: 1rem 0;
    background-color: ${
        props => props.theme.headerBg
    };
    border-bottom: 1px solid ${
        props => props.theme.border
    };
`;


