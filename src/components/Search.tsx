import { JSX } from 'react';

export default function Search({
    query,
    setQuery,
}: {
    query: string;
    setQuery: (value: string) => void;
}): JSX.Element {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
