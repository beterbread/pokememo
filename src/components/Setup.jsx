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
            <div className='credit'>
                <h2 className='creditText'>Made by beterbread</h2>
                <a target='_blank' href='https://github.com/beterbread'>
                    <iframe src="https://giphy.com/embed/CBvjuhJncUt6U"></iframe>
                </a>
            </div>
        </div>
        </>
    );
}
