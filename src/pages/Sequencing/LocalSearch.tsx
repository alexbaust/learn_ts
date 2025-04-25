import { useEffect, useState } from 'react';
import StepButtons from '../../components/StepButtons';
import { useSettingContext } from '../../context/SettingProvider';
import api from '../../services/api';
import '../../styles/NestingEnv.styles.css';
import { NestingResult } from '../../types/NestingEnv.types';
import { Pages } from '../../types/Pags.types';

export default function LocalSearch() {
    const { source, additionalSettings, updatePage, updateAdditionalSettings } =
        useSettingContext();
    const [step, setStep] = useState<number>(1);
    const [result, setResult] = useState<NestingResult | null>(null);
    const maxSteps = 100;

    useEffect(() => {
        updatePage(Pages.LOCALSEARCH);
        updateAdditionalSettings({});
        alert('Additional Settings cleared');
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            setResult(null);
            const potentialSettings = ['mutation_rate', 'nenvs', 'population_size'];
            let queryParametr = '';
            for (const key of potentialSettings) {
                const value = additionalSettings[key];
                if (value !== undefined) {
                    queryParametr += `&${key}=${value}`;
                }
            }
            const data = await api.get<NestingResult>(
                `/sequencing/${source}/${step}/?use_procreant_ga=false${queryParametr}`
            );
            const response = await data.data;
            setResult(response);
        };
        fetchResults();
    }, [step, source, additionalSettings]);

    return (
        <div className="NestingEnv">
            <h1>LocalSearch</h1>
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
