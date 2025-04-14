import { PropsWithChildren, JSX } from 'react';
import Logo from './Logo';

export default function NavBar({ children }: PropsWithChildren): JSX.Element {
    return (
        <nav className="nav-bar">
            <Logo />

            {children}
        </nav>
    );
}
