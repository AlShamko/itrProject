import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "../../layout/header/Header.tsx";
import {HomePage} from "../../pages/home/HomePage.tsx";
import {AdminPage} from "../../pages/admin/AdminPage.tsx";
import {Callback} from "../../pages/callback/callback.tsx";
import styled from "styled-components";

export const Content = () => {

    return (
        <ContentStyled>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                    <Route
                        path="/callback"
                        element={<Callback />}
                    />
                </Routes>
            </BrowserRouter>
        </ContentStyled>
    )
};

const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1200px;
`