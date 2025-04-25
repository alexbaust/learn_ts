import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/SideBar';
import { SettingProvider } from './context/SettingProvider';
import HomePage from './pages/HomePage';
import HyperparameterOptimization from './pages/HyperparameterOptimization';
import NestingEnv from './pages/NestingEnv';
import Parts from './pages/Parts';
import LocalSearch from './pages/Sequencing/LocalSearch';
import MCTS from './pages/Sequencing/MCTS';
import Procreant from './pages/Sequencing/Procreant';
import './styles/App.css';

function App() {
    return (
        <>
            <SettingProvider>
                <div className="app">
                    <NavBar />
                    <div className="main-container">
                        <Sidebar />
                        <div className="main-content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/parts" element={<Parts />} />
                                <Route path="/nestingenv" element={<NestingEnv />} />
                                <Route
                                    path="/hyperparameteroptimization"
                                    element={<HyperparameterOptimization />}
                                />
                                <Route path="/sequencing/mcts" element={<MCTS />} />
                                <Route
                                    path="/sequencing/localsearch"
                                    element={<LocalSearch />}
                                />
                                <Route
                                    path="/sequencing/procreant"
                                    element={<Procreant />}
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            </SettingProvider>
        </>
    );
}

export default App;
