import { JSX, useRef } from 'react';
import { useKey } from '../customHooks/useKey';

export default function Search({
    query,
    setQuery,
}: {
    query: string;
    setQuery: (value: string) => void;
}): JSX.Element {
    const inputEl = useRef<HTMLInputElement>(null);

    // If search bar is not focused, then when 'Enter' key is pressed, focus search bar
    useKey('Enter', function () {
        if (document.activeElement === inputEl.current) return;
        inputEl.current?.focus();
        // Clear search bar (query)
        setQuery('');
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}
