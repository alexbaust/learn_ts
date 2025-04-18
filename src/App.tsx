import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ScoreProvider } from './contexts/ScoreContext';
import HomePage from './pages/HomePage';
import Score from './pages/Score';

function App() {
    return (
        <>
            <ScoreProvider>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/score" element={<Score />} />
                </Routes>
            </ScoreProvider>
        </>
    );
}

export default App;
