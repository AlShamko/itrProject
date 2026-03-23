import {LogtoProvider, type LogtoConfig} from '@logto/react';
import {lightTheme} from "./styles/themes.ts";
import styled, {ThemeProvider} from "styled-components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header/Header.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {AdminPage} from "./pages/AdminPage.tsx";
import {Callback} from "./pages/Callback.tsx";
import {TablePage} from "./pages/TablePage.tsx";
import {SupportTicketModal} from "./components/SupportTicketModal.tsx";

const config: LogtoConfig = {
    endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
    appId: import.meta.env.VITE_LOGTO_APP_ID,
    resources: [import.meta.env.VITE_LOGTO_RESOURCES],
    scopes: [
        'list:tables',
        'create:tables',
        'read:tables',
        'update:tables',
        'delete:tables',
        'publish:tables',
    ],
};

export const App = () => (
    <LogtoProvider config={config}>
        <ThemeProvider theme={lightTheme}>
            <Wrapper>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route

                            path="/table/:id"
                            element={<TablePage />}
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
                    <SupportTicketModal />
                </BrowserRouter>
            </Wrapper>
        </ThemeProvider>
    </LogtoProvider>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1200px;`
