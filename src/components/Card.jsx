import { useEffect, useState } from "react";
import './Card.css';

export default function Card({ id, onClick }) {
    const [pokemon, setPokemon] = useState(null);
    const [sprite, setSprite] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();
            setPokemon(data['name']);
            setSprite(data['sprites']['front_default']);
        }
        fetchData();
    }, [id]); 

    return (
        <div className="pokemonCard">
            <img onClick={onClick} className="pokemonImage" src={sprite}></img>
            <h1 className="pokemonName">{pokemon}</h1>
        </div>
    );
}
