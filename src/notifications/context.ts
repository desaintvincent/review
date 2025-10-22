import { createContext } from 'react';
import type { ShowNotificationOptions } from './NotificationProvider';

export const NotificationContext = createContext<((options: ShowNotificationOptions) => void) | undefined>(undefined);

