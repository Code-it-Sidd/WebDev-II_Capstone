import { useEffect, useRef, useState, useCallback } from 'react';

// Intersection Observer for infinite scroll / lazy loading
export function useIntersection(options = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
}

// Debounce hook for search
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

// Real-time auto refresh
export function useAutoRefresh(callback, interval = 30000) {
  const savedCallback = useRef(callback);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => { savedCallback.current = callback; }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
      setLastRefresh(Date.now());
    };
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);

  const refresh = useCallback(() => {
    savedCallback.current();
    setLastRefresh(Date.now());
  }, []);

  return { lastRefresh, refresh };
}

// Local storage hook
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback((v) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  }, [key]);

  return [value, set];
}

// Scroll position hook
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}
