import styled from 'styled-components';
import {useLogto} from "@logto/react";
import {SearchForm} from "../SearchForm.tsx";
import {Button} from "../Button.tsx";
import LogoImg from "../../assets/img/logo.webp";
import {Link, useNavigate} from "react-router-dom";
import {useTables} from "../../hooks/useTables.ts";

export const Header = () => {
    const { searchQuery, setSearchQuery } = useTables();
    const navigate = useNavigate();
    const { signIn, signOut, isAuthenticated } = useLogto();

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
                    <AdminButton to="/admin">Admin</AdminButton>
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

const AdminButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
    font-size: 1rem;
    color: ${
        props => props.theme.text
    };
    border: 1px solid ${
        props => props.theme.border
    };
    border-radius: 4px;
    background-color: ${
        props => props.theme.surface
    };
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 40px;
    width: auto;
    display: block;
    cursor: pointer;
`;