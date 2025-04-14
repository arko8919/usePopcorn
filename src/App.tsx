import { JSX, useState, useEffect } from 'react';
import {
    movieSchema,
    type MovieData,
    type ApiResponse,
    type WatchedMovieData,
} from './types';

import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Main from './components/Main';
import NavBar from './components/NavBar';
import NumResults from './components/NumResults';
import Search from './components/Search';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedSummary from './components/WatchedSummary';
import Box from './components/Box';
import WatchedMoviesList from './components/WatchedMovieList';

const KEY = 'fd1a1be1';

export default function App(): JSX.Element {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [watched, setWatched] = useState<WatchedMovieData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    function handleSelectMovie(id: string | null) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatch(movie: WatchedMovieData) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id: string | null) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!res.ok)
                        throw new Error(
                            'Something went wrong with fetching movies'
                        );

                    const rawData: ApiResponse = await res.json();

                    // Zod library handle this case of error
                    // if (rawData.Response === 'False')
                    //     throw new Error('Movie not found');

                    const result = movieSchema
                        .array()
                        .safeParse(rawData.Search);

                    if (!result.success) {
                        console.log(result.error.message);
                        throw new Error('Failed to parse movies!');
                    }

                    setMovies(result.data);
                    setError('');
                    //console.log(result.data);
                } catch (err) {
                    if (err instanceof Error) {
                        if (err.name !== 'AbortError') {
                            setError(err.message);
                        }
                    } else {
                        setError('Something went wrong...');
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }
            handleCloseMovie();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatch}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
