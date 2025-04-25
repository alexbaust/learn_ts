import '../styles/StepButtons.styles.css';

export default function StepButtons({
    step,
    setStep,
    maxStep,
}: {
    step: number;
    setStep: (step: number) => void;
    maxStep: number;
}) {
    return (
        <div className="step-buttons">
            <h3>Select the step to display:</h3>
            <div className="buttons">
                <button className="btn-step" onClick={() => setStep(1)}>
                    First
                </button>
                <button
                    className={`btn-step ${step === 1 ? 'btn-disaled' : ''}`}
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                >
                    Previous
                </button>
                <button
                    className={`btn-step ${step === maxStep ? 'btn-disaled' : ''}`}
                    onClick={() => setStep(step + 1)}
                    disabled={step === maxStep}
                >
                    Next
                </button>
                <button className="btn-step" onClick={() => setStep(maxStep)}>
                    Last
                </button>
                <input
                    className="input"
                    type="number"
                    min={1}
                    max={maxStep}
                    value={step}
                    onChange={(e) => {
                        setStep(Number(e.target.value));
                    }}
                />
            </div>
            <h4>
                Selected Step: {step} / {maxStep}
            </h4>
        </div>
    );
}
