import { useState, useEffect } from 'react';
import './App.css';
import Card from "./components/Card.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import Pokemon from "./components/Pokemon.js";

function App() {

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [currentCards, setCurrentCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState("");

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
        const cards = await makeCards(5);
        setCurrentCards(cards);
    }

    function randomize() {
        const shuffledCards = [...currentCards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        setCurrentCards(shuffledCards);
    }

    useEffect(() => {  
        let count = 0;
        for (let i = 0; i < clickedCards.length; i++) {
            if (clickedCards[i] === currentPokemon) {
                count++;
            }
        }
        if (count === 2 || clickedCards.length === 0) {
            initializeGame();
            setCurrentScore(0);
        }  
        else {
            randomize();
            setCurrentScore(currentScore + 1);
            if (currentScore + 1 > bestScore) {
                setBestScore(currentScore + 1); 
            }
        }
    }, [clickedCards]);

    return (
        <div>
            {currentCards}
            <Scoreboard current={currentScore} best={bestScore} />
        </div>
    );
}

export default App;
