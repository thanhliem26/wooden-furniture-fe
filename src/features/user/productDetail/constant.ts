import { createContext } from 'react';

interface WebSocketContext {
    ws: WebSocket | null;
    product_id: number | undefined;
}

export const WebSocketContext = createContext<WebSocketContext>({ws: null, product_id: 0});
