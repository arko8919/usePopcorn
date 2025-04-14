import { JSX } from 'react';

export default function ErrorMessage({
    message,
}: {
    message: string;
}): JSX.Element {
    return (
        <p className="error">
            <span>👮‍♀️</span> {message}
        </p>
    );
}
