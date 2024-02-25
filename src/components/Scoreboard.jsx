import './Scoreboard.css';

export default function Scoreboard({current, best}) {
    return (
    <div className="scoreboard">
        <div className="current">
            <h1>Current score</h1>
            <h1>{current}</h1>
        </div>
        <div className="best">
            <h1>Best score</h1>
            <h1>{best}</h1>
        </div>
    </div>
    );
}