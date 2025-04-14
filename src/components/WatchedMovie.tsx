import { JSX } from 'react';
import { type WatchedMovieData } from '../types';

export default function WatchedMovie({
    movie,
    onDeleteWatched,
}: {
    movie: WatchedMovieData;
    onDeleteWatched: (id: string | null) => void;
}): JSX.Element {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                    <span>user rating</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>

                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
