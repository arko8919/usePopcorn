import React from 'react';
//import { JSX, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import StarRating from './StarRating';

// function Test(): JSX.Element {
//     const [movieRating, setMovieRating] = useState(0);
//     return (
//         <div>
//             <StarRating
//                 color="blue"
//                 maxRating={10}
//                 onSetRating={setMovieRating}
//             />
//             <p> This movies was rated {movieRating}stars</p>
//         </div>
//     );
// }

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/* <StarRating
            maxRating={5}
            messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
        />
        <StarRating size={24} color="red" className="test" defaultRating={3} />
        <Test /> */}
        <App />
    </React.StrictMode>
);
