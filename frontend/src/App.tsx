import {LogtoProvider, type LogtoConfig} from '@logto/react';
import {lightTheme} from "./styles/themes.ts";
import {ThemeProvider} from "styled-components";
import {Content} from "./components/content/Content.tsx";

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
            <Content />
        </ThemeProvider>
    </LogtoProvider>
);

