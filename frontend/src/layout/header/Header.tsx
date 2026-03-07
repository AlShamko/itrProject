import styled from 'styled-components';
import {useLogto} from "@logto/react";
import {SearchForm} from "../../components/searchForm/SearchForm.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {Button} from "../../components/button/Button.tsx";
// import {useState} from "react";

export const Header = () => {
    const {signIn, signOut, isAuthenticated} = useLogto();
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
                <Button onClick={() => signOut('http://localhost:5173/')}>Sign Out</Button>
            ) : (
                <Button onClick={() => signIn('http://localhost:5173/callback')}>Sign In</Button>
            )}
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: ${props => props.theme.headerBg};
    border-bottom: 1px solid ${props => props.theme.border};
`;


