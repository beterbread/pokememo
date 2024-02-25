import { useState } from 'react';
import './Setup.css';

export default function Setup({ onPlay, check }) {
    const [numCards, setNumCards] = useState(0); 

    return (
        <div className='setupForm'>
            {check && <h1>You win!</h1>}
            <h1>How many cards?</h1>
            <input
                className='inputNum'
                type="number"
                placeholder='?'
                onChange={(event) => setNumCards(parseInt(event.target.value))}
            ></input>
            <button onClick={() => onPlay(numCards)}>Play</button> 
        </div>
    );
}
