import { useEffect, useState } from 'react';
import StepButtons from '../components/StepButtons';
import { useSettingContext } from '../context/SettingProvider';
import api from '../services/api';
import '../styles/NestingEnv.styles.css';
import { NestingResult } from '../types/NestingEnv.types';
import { Pages } from '../types/Pags.types';

export default function NestingEnv() {
    const { source, maxSteps, updatePage } = useSettingContext();
    const [step, setStep] = useState<number>(1);
    const [result, setResult] = useState<NestingResult | null>(null);

    useEffect(() => {
        updatePage(Pages.NESTINGENV);
    }, []);

    useEffect(() => {
        setStep(Math.min(step, maxSteps));
    }, [maxSteps]);

    useEffect(() => {
        const fetchResults = async () => {
            setResult(null);
            const data = await api.get<NestingResult>(`/placement/${source}/${step}`);
            const response = await data.data;
            setResult(response);
        };
        fetchResults();
    }, [step, source]);

    return (
        <div className="NestingEnv">
            <h1>NestingEnv</h1>
            <StepButtons step={step} setStep={setStep} maxStep={maxSteps}></StepButtons>
            {result === null ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="results">
                    <p>
                        Sheet Size: {result.sheetHeight} mm x {result.sheetWidth} mm
                    </p>
                    <p>
                        Computation Time: {result.calculationTime} {result.unitTime}
                    </p>
                    <p>
                        Compactness: {result.compactness}% ({result.sheetCount} Sheets)
                    </p>
                    <p>
                        Actions: (RotationStep: {result.rotationStep}°, FlipAction:{' '}
                        {result.useFlip ? 'True' : 'False'} )
                    </p>
                    <div className="result-image-wrapper">
                        <img
                            className="result-image"
                            src={result.url}
                            alt="Result img"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
