import { createContext } from 'react';

interface WebSocketNewsContext {
    ws: WebSocket | null;
    news_id: string | undefined;
}

export const WebSocketNewsContext = createContext<WebSocketNewsContext>({ws: null, news_id: ''});
