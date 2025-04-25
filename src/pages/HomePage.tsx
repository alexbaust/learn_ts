import { useEffect, useState } from 'react';
import Image from '../assets/nesting.png';
import { useSettingContext } from '../context/SettingProvider';
import api from '../services/api';
import '../styles/HomePage.styles.css';
import { Pages } from '../types/Pags.types';

function HomePage() {
    const { updatePage } = useSettingContext();
    const [serverRunning, setServerRunning] = useState<string>('Offline');

    useEffect(() => {
        updatePage(Pages.HOMEPAGE);
    }, []);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await api.get<boolean>('/');
                if (response.status === 200 && response.data) {
                    setServerRunning('Online');
                } else {
                    setServerRunning('Offline');
                }
            } catch (error) {
                setServerRunning('Offline');
            }
        };
        checkServerStatus();
    }, []);

    return (
        <div className="home-page">
            <h1>de:karb Nesting Demo</h1>
            <p>
                Backend-Server-Status:{' '}
                {serverRunning === 'Offline' ? (
                    <span className="offline">{serverRunning}</span>
                ) : (
                    <span className="online">{serverRunning}</span>
                )}
            </p>
            <hr />
            <img className="image" src={Image} alt="de:karb Nesting" />
        </div>
    );
}

export default HomePage;
