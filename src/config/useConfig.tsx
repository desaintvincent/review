/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AppConfig = {
  baseUrl: string;
  username: string;
  apiPrefix: string;
  color?: string; // optional
};

const LOCAL_STORAGE_KEY = 'appConfig';

function loadConfig(): AppConfig {
  if (typeof window === 'undefined') {
    return { baseUrl: '', username: '', apiPrefix: '', color: '' };
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { baseUrl: '', username: '', apiPrefix: '', color: '' };
    const parsed = JSON.parse(raw) as Partial<AppConfig>;
    return {
      baseUrl: parsed.baseUrl ?? '',
      username: parsed.username ?? '',
      apiPrefix: parsed.apiPrefix ?? '',
      color: parsed.color ?? '',
    };
  } catch {
    return { baseUrl: '', username: '', apiPrefix: '', color: '' };
  }
}

function isConfigValid(cfg: AppConfig): boolean {
  return !!cfg.baseUrl.trim() && !!cfg.username.trim() && !!cfg.apiPrefix.trim();
}

interface ConfigContextValue {
  config: AppConfig;
  setField: (field: keyof AppConfig, value: string) => void;
  save: () => void;
  reset: () => void;
  isValid: boolean;
  dirty: boolean; // added
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<AppConfig>(() => loadConfig());
  const [dirty, setDirty] = useState(false);

  const setField = useCallback((field: keyof AppConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  }, []);

  const save = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    }
    setDirty(false);
  }, [config]);

  const reset = useCallback(() => {
    setConfig({ baseUrl: '', username: '', apiPrefix: '', color: '' });
    setDirty(true);
  }, []);

  // Auto-save when config becomes valid and was dirty? Not requested, so keep manual save.

  const value: ConfigContextValue = {
    config,
    setField,
    save,
    reset,
    isValid: isConfigValid(config),
    dirty,
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within a ConfigProvider');
  return ctx;
}
