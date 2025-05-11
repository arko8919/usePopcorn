import { z } from 'zod';

export const movieSchema = z.object({
    Poster: z.string(),
    Title: z.string(),
    Type: z.string(),
    Year: z.string(),
    imdbID: z.string(),
});

export const movieDetailsSchema = z.object({
    Title: z.string(),
    Year: z.string(),
    Rated: z.string(),
    Released: z.string(),
    Runtime: z.string(),
    Genre: z.string(),
    Director: z.string(),
    Writer: z.string(),
    Actors: z.string(),
    Plot: z.string(),
    Language: z.string(),
    Country: z.string(),
    Awards: z.string(),
    Poster: z.string(),
    Ratings: z
        .array(
            z.object({
                Source: z.string(),
                Value: z.string(),
            })
        )
        .optional(),
    Metascore: z.string(),
    imdbRating: z.string(),
    imdbVotes: z.string(),
    imdbID: z.string(),
    Type: z.string(),
    DVD: z.string().optional(),
    BoxOffice: z.string().optional(),
    Production: z.string().optional(),
    Website: z.string().optional(),
    Response: z.string(),
});

export type MoviePreview = Pick<
    MovieDetailsData,
    | 'Title'
    | 'Year'
    | 'Poster'
    | 'Runtime'
    | 'imdbRating'
    | 'Plot'
    | 'Released'
    | 'Actors'
    | 'Director'
    | 'Genre'
>;

export type ApiResponse = {
    Search: MovieData[];
    totalResults: string;
    Response: string;
};

export type MovieData = z.infer<typeof movieSchema>;
export type MovieDetailsData = z.infer<typeof movieDetailsSchema>;

export type WatchedMovieData = {
    imdbID: string | null;
    title: string;
    year: string;
    poster: string;
    imdbRating: number;
    runtime: number;
    userRating: number;
    countRatingDecisions: number;
};
