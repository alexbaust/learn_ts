import { useEffect, useState } from 'react';
import Row from '../components/Row';
import { useScoreContext } from '../contexts/ScoreContext';
import { getRandomWord } from '../servies/api';
import '../styles/HomePage.styles.css';
import { CharacterStatus } from '../types/wordType';
import { evalWords } from '../utils/eval';

function HomePage() {
    const { addScore } = useScoreContext();
    // Get a random word
    const [RandomWord, setRandomWord] = useState<string>('');
    useEffect(() => {
        setRandomWord(getRandomWord());
    }, []);

    // guesses
    const emptyLine: string = '     ';
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(emptyLine));
    const [row, setRow] = useState<number>(0);
    const [status, setStatus] = useState<CharacterStatus[][]>(
        Array(6).fill(Array(5).fill(CharacterStatus.UNKNOWN))
    );
    const [done, setDone] = useState<boolean>(false);
    const refresh = () => {
        setDone(false);
        setGuesses(Array(6).fill(emptyLine));
        setRow(0);
        setStatus(Array(6).fill(Array(5).fill(CharacterStatus.UNKNOWN)));
        setRandomWord(getRandomWord());
    };
    const enter = () => {
        const crtGuess = guesses[row].trim();
        console.log(RandomWord);

        if (done) {
            return;
        }

        if (crtGuess.length !== 5) {
            return;
        }

        // eval
        const [correct, newStatus] = evalWords(RandomWord, crtGuess);
        status[row] = newStatus;
        setStatus(status);
        if (!correct) {
            setRow(row + 1);
        }

        if (correct || row >= 5) {
            setDone(true);
            addScore(row);
        }
    };

    useEffect(() => {
        const handleType = (event: KeyboardEvent) => {
            const key = event.key;
            const crtGuess = guesses[row].trim();
            console.log(RandomWord);

            if (done) {
                return;
            }

            if (key === 'Enter') {
                if (crtGuess.length === 5) {
                    // eval
                    const [correct, newStatus] = evalWords(RandomWord, crtGuess);
                    status[row] = newStatus;
                    setStatus(status);
                    if (!correct) {
                        setRow(row + 1);
                    }

                    if (correct || row >= 5) {
                        setDone(true);
                        addScore(row);
                    }
                }
            } else if (key === 'Backspace' && crtGuess.length > 0) {
                const newGuesses = [...guesses];
                newGuesses[row] = crtGuess.slice(0, -1).padEnd(5, ' ');
                setGuesses(newGuesses);
            } else if (/^[a-zA-Z]$/.test(event.key) && crtGuess.length < 5) {
                const newGuesses = [...guesses];
                newGuesses[row] = (crtGuess + key).padEnd(5, ' ');
                setGuesses(newGuesses);
            }
        };

        window.addEventListener('keydown', handleType);
        return () => window.removeEventListener('keydown', handleType);
    }, [row, guesses, status, RandomWord, done, addScore]);

    return (
        <div className="screen">
            <div className="game-wrapper">
                <div className="game">
                    {guesses.map((guess, index) => (
                        <Row
                            chars={guess}
                            status={status[index]}
                            crtRow={index === row}
                            key={index}
                        />
                    ))}
                </div>
                <button className="refresh-btn" onClick={enter}>
                    Enter
                </button>
                <button
                    className={`refresh-btn ${done ? 'done' : ''}`}
                    onClick={refresh}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default HomePage;
