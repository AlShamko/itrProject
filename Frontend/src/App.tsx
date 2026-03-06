import './App.css'
import {LogtoProvider, type LogtoConfig} from '@logto/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Header} from "./layout/header/Header.tsx";
import {Callback} from "./pages/Callback/callback.tsx";
import {lightTheme} from "./styles/themes.ts";
import {ThemeProvider} from "styled-components";
import {CardsTable} from "./layout/cardsTable/CardsTable.tsx";
import {CardsBar} from "./layout/cardsBar/CardsBar.tsx";

const config: LogtoConfig = {
    endpoint: 'https://nd76sa.logto.app/',
    appId: 'z9nnm8b3gir6e7f7q6css',
    resources: ['https://api.inventory-app.com'],
};

export const App = () => (
    <LogtoProvider config={config}>
        <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
                <Header />
                <CardsBar />
                <CardsTable />
                <Routes>
                    <Route
                        path="/"
                        element={<div>Main Page Content</div>}
                    />
                    <Route
                        path="/callback"
                        element={<Callback />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </LogtoProvider>
);
