import { PropsWithChildren, JSX } from 'react';

export default function Main({ children }: PropsWithChildren): JSX.Element {
    return <main className="main">{children}</main>;
}
