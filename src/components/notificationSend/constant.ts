export interface notificationType {
    message: string,
    description?: string,
    onClick?: void,
    icon?: React.ReactNode,
    type?: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
}