import { useContext } from 'react';
import { NotificationContext } from './context';
import type { ShowNotificationOptions } from './NotificationProvider';

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return { showNotification: ctx } as const;
}

export type { ShowNotificationOptions };
