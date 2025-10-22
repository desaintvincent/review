import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    setValue(readValue());
  }, [key]);

  const setStoredValue = useCallback((val: T) => {
    setValue(val);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(val));
      } catch {
        // ignore write errors
      }
    }
  }, [key]);

  return [value, setStoredValue];
}
