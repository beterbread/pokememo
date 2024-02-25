import { useState, useEffect } from 'react';
import './App.css';
import Card from "./components/Card.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Setup from "./components/Setup.jsx";
import Pokemon from "./components/Pokemon.js";

function App() {

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [currentCards, setCurrentCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState("");
    const [number, setNumber] = useState(0);
    const [formCheck, setFormCheck] = useState(true);
    const [replayCheck, setReplayCheck] = useState(false);

    const startGame = (num) => {
        if (num >= 1 && num <= 1024) {
            setNumber(num);
            setFormCheck(false);
        }
    }

    const updateList = (pokemon) => {
        setCurrentPokemon(pokemon);
        setClickedCards(prevClickedCards => [...prevClickedCards, pokemon]);
    }

    async function makeCards(count) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            const randomPokemon = await Pokemon(Math.floor(Math.random() * 1026));
            arr.push(<Card key={i} pokemon={randomPokemon.pokemon} sprite={randomPokemon.sprite}
                 updateList={updateList} />);

        }
        return arr;
    }

    async function initializeGame() {
        const cards = await makeCards(number);
        setCurrentCards(cards);
        setCurrentScore(0);
    }

    function randomize() {
        setCurrentScore(currentScore + 1);
        if (currentScore + 1 > bestScore) {
            setBestScore(currentScore + 1); 
        }
        console.log(currentScore);
        console.log(number);
        if (currentScore + 1 === number) {
            setFormCheck(true);
            setCurrentCards([]);
            setCurrentScore(0);
            setClickedCards([]);
            setNumber(0);
            setReplayCheck(true);
        }
        else {
            const shuffledCards = [...currentCards];
            for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
                [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
            }
            setCurrentCards(shuffledCards);
        }
    }

    useEffect(() => {  
        let count = 0;
        for (let i = 0; i < clickedCards.length; i++) {
            if (clickedCards[i] === currentPokemon) {
                count++;
            }
        }
        if (number !== 0) {
            if (count === 2 || clickedCards.length === 0) {
                initializeGame();
            }  
            else {
                randomize();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number, clickedCards]);

    return (
        <div className='appContainer' style={{backgroundImage: `url('wallpaper.jpg')`}}>
            {formCheck && <Setup onPlay={startGame} check={replayCheck}></Setup>}
            <div className='cardContainer'>
            <Scoreboard current={currentScore} best={bestScore} />
            {currentCards}
            </div>
        </div>
    );
}

export default App;
