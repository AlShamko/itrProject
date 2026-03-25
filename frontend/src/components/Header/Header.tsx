import styled from 'styled-components';
import {useLogto} from "@logto/react";
import {SearchForm} from "../SearchForm.tsx";
import {Button} from "../Button.tsx";
import LogoImg from "../../assets/img/logo.webp";
import {useNavigate} from "react-router-dom";
import {useTables} from "../../hooks/useTables.ts";

export const Header = () => {
    const {searchQuery, setSearchQuery} = useTables();
    const navigate = useNavigate();
    const {signIn, signOut, isAuthenticated} = useLogto();

    const handleSignIn = () => {
        signIn(`${window.location.origin}/callback`);
    };

    const handleSignOut = () => {
        signOut(window.location.origin);
    };

    return (
        <StyledHeader>
            <Logo
                src={LogoImg}
                alt="logo"
                onClick={() => navigate(`/`)}
            />
            <SearchForm
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isAuthenticated ? (
                <ButtonsContainer>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </ButtonsContainer>
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
    top: 0;
    z-index: 100;
    padding: 1rem 0;
    background-color: ${
    props => props.theme.headerBg
};
    border-bottom: 1px solid ${
    props => props.theme.border
};
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Logo = styled.img`
    height: 40px;
    width: auto;
    display: block;
    cursor: pointer;
`;