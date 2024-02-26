import { useState } from 'react';
import './Setup.css';

export default function Setup({ onPlay, check }) {
    const [numCards, setNumCards] = useState(0); 

    return (
        <>
        <div className='setupForm'>
            {check && <h1>You win!</h1>}
            {!check && <h1>Dont select the same card twice!</h1>}
            <h1>How many cards?</h1>
            <input
                className='inputNum'
                type="number"
                placeholder='1-1025'
                onChange={(event) => setNumCards(parseInt(event.target.value))}
            ></input>
            <button onClick={() => onPlay(numCards)}>Play</button> 
        </div>
        <div className='credit'>
            <h1>Made by beterbread</h1>
            <iframe src="https://giphy.com/embed/CBvjuhJncUt6U"allowFullScreen></iframe>
        </div>
        </>
    );
}
