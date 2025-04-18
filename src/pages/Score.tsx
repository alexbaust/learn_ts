import { useScoreContext } from '../contexts/ScoreContext';
import '../styles/Score.styles.css';

function Score() {
    const { scores } = useScoreContext();

    if (scores.length > 0) {
        const filteredScores = scores.filter((score) => score < 5);
        const percentage = ((100 * filteredScores.length) / scores.length).toFixed(2);
        let sum = 0;
        for (const element of scores) {
            sum += element;
        }
        const avgScore = (sum / scores.length).toFixed(2);
        return (
            <div className="score">
                <div className="info-box">
                    <h2>Statistics</h2>
                    <div className="stats">
                        <div className="oneStat">
                            <p>Percantage Correct</p>
                            <p>{percentage} %</p>
                        </div>
                        <div className="oneStat">
                            <p>Average Score</p>
                            <p>{avgScore}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="score">
                <div className="info-box">
                    <h2>No games played yet</h2>
                    <p>After games are played, some statistics will appear here!</p>
                </div>
            </div>
        );
    }
}

export default Score;
