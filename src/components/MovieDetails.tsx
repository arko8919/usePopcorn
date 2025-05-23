import { useEffect, JSX, useState, useRef } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import ErrorMessage from './ErrorMessage';

import {
    movieDetailsSchema,
    type MoviePreview,
    type WatchedMovieData,
} from '../types';
import { useKey } from '../customHooks/useKey';

const KEY = 'fd1a1be1';
export default function MovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watched,
}: {
    selectedId: string | null;
    onCloseMovie: () => void;
    onAddWatched: (WatchedMovie: WatchedMovieData) => void;
    watched: WatchedMovieData[];
}): JSX.Element | null {
    const [movie, setMovie] = useState<MoviePreview | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userRating, setUserRating] = useState(0);

    const countRef = useRef(0);

    useEffect(
        function () {
            if (userRating) countRef.current = countRef.current + 1;
        },
        [userRating]
    );

    // Check if a movie with selectedId is already in the watched list.
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    // Get the user rating for the selected movie only if it exists.
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                    );

                    const rawData = await res.json();

                    const result = movieDetailsSchema.safeParse(rawData);

                    if (!result.success) {
                        console.log(result.error.message);
                        throw new Error('There is no movie details');
                    }

                    setMovie(result.data);
                } catch (err) {
                    const msgErr =
                        err instanceof Error
                            ? err.message
                            : 'there was some error...';
                    console.log(msgErr);
                    setError(msgErr);
                } finally {
                    setIsLoading(false);
                }
            }
            getMovieDetails();
        },
        [selectedId]
    );

    useEffect(() => {
        if (!movie?.Title) return;
        document.title = `Movie | ${movie.Title}`;
        return () => {
            document.title = 'usePopcorn';
        };
    }, [movie]);

    useKey('Escape', onCloseMovie);

    if (!movie) return null;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const WatchedMovie: WatchedMovieData = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        };
        onAddWatched(WatchedMovie);
        onCloseMovie();
    }

    return (
        <div className="details">
            {isLoading && <Loader />}

            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>🚀</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>You rated this movie {watchedUserRating}</p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    );
}
