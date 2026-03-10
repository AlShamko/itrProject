import {LogtoProvider, type LogtoConfig} from '@logto/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Header} from "./layout/header/Header.tsx";
import {Callback} from "./pages/callback/callback.tsx";
import {lightTheme} from "./styles/themes.ts";
import {ThemeProvider} from "styled-components";
import {HomePage} from "./pages/home/HomePage.tsx";


const config: LogtoConfig = {
    endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
    appId: import.meta.env.VITE_LOGTO_APP_ID,
    resources: [import.meta.env.VITE_LOGTO_RESOURCES],
};

export const App = () => (
    <LogtoProvider config={config}>
        <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage />
                        }
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
