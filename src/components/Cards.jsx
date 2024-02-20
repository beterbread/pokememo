import { useState } from "react";
import Card from "./Card.jsx";
import './Cards.css';

export default function Cards({ count }) {
    const onCardClick = () => {
        setCardsArray([...cardsArray].sort(() => Math.random() - 0.5));
    };

    const initial = [];
    for (let i = 0; i < count; i++) {
        initial.push(<Card key={i} id={Math.floor(Math.random() * 1026)} onClick={onCardClick} />);
    }

    const [cardsArray, setCardsArray] = useState(initial);

    return <div className="cardContainer">{cardsArray}</div>;
}
