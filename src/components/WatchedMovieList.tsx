import { JSX } from 'react';
import WatchedMovie from './WatchedMovie';

import { type WatchedMovieData } from '../types';

export default function WatchedMoviesList({
    watched,
    onDeleteWatched,
}: {
    watched: WatchedMovieData[];
    onDeleteWatched: (id: string | null) => void;
}): JSX.Element {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
}
