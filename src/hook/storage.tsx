import { useState, useEffect } from "react";


const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void, (value: T) => void] => {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue: string | null = localStorage.getItem(key);
            return (storedValue ? JSON.parse(storedValue) : initialValue) as T;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            window.dispatchEvent(new Event("localStorageChange"));
        } catch (error) {
            console.error("Error setting localStorage", error);
        }
    }, [key, value]);

    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const newValue: string | null = localStorage.getItem(key);
                const parsedValue: T = newValue ? JSON.parse(newValue) : initialValue;
                setValue((prev) => (
                    JSON.stringify(prev) !== JSON.stringify(parsedValue) ? parsedValue : prev
                ));
            } catch (error) {
                console.error("Error reading localStorage", error);
            }
        };

        window.addEventListener("localStorageChange", handleStorageChange);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("localStorageChange", handleStorageChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setValue(initialValue);
            window.dispatchEvent(new Event("localStorageChange"));
        } catch (error) {
            console.error("Error removing localStorage", error);
        }
    };

  return [value, setValue, removeValue];
}

export default useLocalStorage;
