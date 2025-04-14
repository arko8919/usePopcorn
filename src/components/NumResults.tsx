import { JSX } from 'react';
import { type MovieData } from '../types';
export default function NumResults({
    movies,
}: {
    movies: MovieData[];
}): JSX.Element {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}
