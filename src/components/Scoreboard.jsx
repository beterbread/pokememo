export default function Scoreboard({current, best}) {
    return (
    <div className="scoreboard">
        <h1 className="current">{current}</h1>
        <h1 className="best">{best}</h1>
    </div>
    );
}