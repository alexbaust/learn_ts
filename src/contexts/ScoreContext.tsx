import React, { createContext, useContext, useEffect, useState } from 'react';

type contextType = {
    scores: number[];
    addScore: (score: number) => void;
};
const ScoreContext = createContext<contextType>({
    scores: [],
    addScore: () => {},
});
export const useScoreContext = () => useContext<contextType>(ScoreContext);

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [scores, setScores] = useState<number[]>([]);

    useEffect(() => {
        const storedScores = localStorage.getItem('scores');

        if (storedScores) setScores(JSON.parse(storedScores));
    }, []);

    useEffect(() => {
        localStorage.setItem('scores', JSON.stringify(scores));
    }, [scores]);

    const addScore = (score: number) => {
        setScores((prev) => [...prev, score]);
    };

    const value = {
        scores,
        addScore,
    };

    return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
};
