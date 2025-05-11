import { JSX } from 'react';
export default function NumResults({
    moviesQuantity,
}: {
    moviesQuantity: number;
}): JSX.Element {
    return (
        <p className="num-results">
            Found <strong>{moviesQuantity}</strong> results
        </p>
    );
}
