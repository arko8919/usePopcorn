import { useState, useEffect } from 'react';

export function useLocalStorageState<T>(
    initialValue: [],
    key: string
    //  Type of the setter function which could either direct value or updater function
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        // Get data from local storage
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
        // Set data in local storage
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
