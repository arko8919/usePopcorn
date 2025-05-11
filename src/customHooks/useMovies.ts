import { useState, useEffect } from 'react';

import { movieSchema, type MovieData, type ApiResponse } from '../types';

const KEY = 'fd1a1be1';

export function useMovies(query: string) {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(
        function () {
            // Allows you to abort things like fetch requests or event listeners before they finish.
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        // Links the fetch request to controller.signal.
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

                    // .array() This returns a new schema that expects an array of movie objects.
                    // .safeParse This runs the validation on rawData.Search, using the rule you prepared.
                    const result = movieSchema
                        .array()
                        // Never throws. Always returns an object like { success: true/false, data/error }.
                        .safeParse(rawData.Search);

                    if (!result.success) {
                        console.log(result.error.message);
                        throw new Error('Failed to parse movies!');
                    }

                    setMovies(result.data);
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
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
