import { JSX } from 'react';
import Movie from './Movie';
import { type MovieData } from '../types';

export default function MovieList({
    movies,
    onSelectMovie,
}: {
    movies: MovieData[];
    onSelectMovie: (id: string | null) => void;
}): JSX.Element {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                    key={movie.imdbID}
                />
            ))}
        </ul>
    );
}
