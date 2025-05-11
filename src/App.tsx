import { JSX, useState } from 'react';
import { type WatchedMovieData } from './types';

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

import { useMovies } from './customHooks/useMovies';
import { useLocalStorageState } from './customHooks/useLocalStorageState';

export default function App(): JSX.Element {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { movies, isLoading, error } = useMovies(query);

    const [watched, setWatched] = useLocalStorageState<WatchedMovieData[]>(
        [],
        'watched'
    );

    // When clicked it open movie details box and when clicked again it close the movie details box
    function handleSelectMovie(id: string | null) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    // Close movie details box
    function handleCloseMovie() {
        setSelectedId(null);
    }

    // Add to movie watched list
    function handleAddWatch(movie: WatchedMovieData) {
        setWatched((watched) => [...watched, movie]);
    }

    // Delete movie from watched list
    function handleDeleteWatched(id: string | null) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults moviesQuantity={movies.length} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
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
