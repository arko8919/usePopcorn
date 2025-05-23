import { JSX } from 'react';
import { type MovieData } from '../types';

export default function Movie({
    movie,
    onSelectMovie,
}: {
    movie: MovieData;
    onSelectMovie: (id: string | null) => void;
}): JSX.Element {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
