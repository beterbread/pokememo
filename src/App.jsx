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
    const [loading, setLoading] = useState(false);

    const startGame = (num) => {
        if (num >= 1 && num <= 1025) {
            setNumber(num);
            setFormCheck(false);
        }
    }

    const updateList = (pokemon) => {
        setCurrentPokemon(pokemon);
        setClickedCards(prevClickedCards => [...prevClickedCards, pokemon]);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function makeCards(count) {
        setLoading(true);
        const arr = [];
        const allIds = Array.from(Array(1025).keys(), i => i + 1);
        shuffleArray(allIds); 
        for (let i = 0; i < count; i++) {
            const randomIndex = allIds[i];
            const randomPokemon = await Pokemon(randomIndex);
            arr.push(<Card key={randomIndex} pokemon={randomPokemon.pokemon} sprite={randomPokemon.sprite} updateList={updateList} />);
        }
        setLoading(false);
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
            shuffleArray(shuffledCards);
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
                {loading ? 
                <div className='loadingContainer'>
                    <img className='pokeball' src={'pokeball.png'}></img> 
                    <p>Loading</p>
                </div> : (
                    <>
                        {currentCards.length > 0 && <Scoreboard current={currentScore} best={bestScore} />}
                        {currentCards}
                    </>
                )}
            </div>
        </div>
    );
    
}

export default App;
