import './Card.css';

export default function Card({ pokemon, sprite, updateList }) {
    return (
    <div className="pokemonCard" onClick={() => updateList(pokemon)}>
        <img className="pokemonImage" src={sprite} alt={pokemon}></img>
        <h1 className="pokemonName">{pokemon}</h1>
    </div>
    );
}