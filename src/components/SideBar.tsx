import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Gear, List, Play } from 'react-bootstrap-icons'; // Importiere Icons
import { useSettingContext } from '../context/SettingProvider';
import api from '../services/api';
import '../styles/SideBar.styles.css';
import { Pages } from '../types/Pags.types';
import { TrajectoryData } from '../types/Trajectory';

function SidebarCollapsed({ handleExpand }: { handleExpand: () => void }) {
    return (
        <div className="sidebar-minimized">
            <Button
                variant="outline-secondary"
                size="sm"
                className="expand-button"
                onClick={handleExpand}
                title="Open"
            >
                <List />
            </Button>
            <div className="icon-container" title="Source">
                <List size={24} onClick={handleExpand} style={{ cursor: 'pointer' }} />
            </div>
            <div className="icon-container" title="Additional Settings">
                <Gear size={24} onClick={handleExpand} style={{ cursor: 'pointer' }} />
            </div>
            <div className="icon-container" title="Run">
                <Play size={24} onClick={handleExpand} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    );
}

function SidebarOpen({
    TrajectoryDatas,
    handleClose,
}: {
    TrajectoryDatas: TrajectoryData[];
    handleClose: () => void;
}) {
    const { crtPage, source, maxSteps, updateSource, updateAdditionalSettings } =
        useSettingContext();
    const [nenvs, setNEnvs] = useState<number>(1);
    const [populationSize, setPopulationSize] = useState<number>(12);
    const [mutationRate, setMutationRate] = useState<number>(0.1);
    const [useOptunaBO, setUseOptunaBO] = useState<boolean>(true);
    const [useLogEI, setUseLogEI] = useState<boolean>(false);
    const [ucbBeta, setUcbBeta] = useState<number>(2);
    const [defaultOneCoeff, setDefaultOneCoeff] = useState<boolean>(false);
    const [raveSequenceLength, setRaveSequenceLength] = useState<number>(3);
    const [kEqualWeight, setkEqualWeight] = useState<number>(25);

    function registerSource(index: string | null) {
        if (index) {
            const numberIndex = Number(index) - 1;
            const Trajectory = TrajectoryDatas[numberIndex];
            updateSource(Trajectory.label, Trajectory.maxSteps);
        }
    }

    const pagesWithNoAdditionalSettings: Pages[] = [
        Pages.HOMEPAGE,
        Pages.NESTINGENV,
        Pages.PARTS,
    ];

    const pagesWithGASettings: Pages[] = [Pages.LOCALSEARCH, Pages.PROCREANT];

    function applySettings() {
        if (pagesWithNoAdditionalSettings.includes(crtPage)) {
            return;
        }
        if (pagesWithGASettings.includes(crtPage)) {
            const additionalSettings = {
                mutation_rate: mutationRate,
                nenvs: nenvs,
                population_size: populationSize,
            };
            updateAdditionalSettings(additionalSettings);
        }
        if (crtPage === Pages.HPARAMOPT) {
            const additionalSettings = {
                use_optuna_bo: useOptunaBO,
                use_logEI: useLogEI,
                ucb_beta: ucbBeta,
                default_one_coeff: defaultOneCoeff,
            };
            updateAdditionalSettings(additionalSettings);
        }
        if (crtPage === Pages.MCTS) {
            const additionalSettings = {
                rave_sequence_length: raveSequenceLength,
                k_equal_weight: kEqualWeight,
            };
            updateAdditionalSettings(additionalSettings);
        }
    }

    return (
        <div className="sidebar-expanded">
            <Button
                variant="outline-secondary"
                size="sm"
                className="expand-button"
                onClick={handleClose}
                title="Close"
            >
                <List />
            </Button>

            <h2>Settings</h2>
            <div>
                <hr />
                <h4>Source</h4>

                <Dropdown
                    onSelect={(index) => {
                        registerSource(index);
                    }}
                >
                    <Dropdown.Toggle variant="light" id="dropdown-source">
                        Select Source text
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {TrajectoryDatas.map((item) => (
                            <Dropdown.Item
                                key={item.id}
                                eventKey={item.id}
                                className="dropdown-item-with-info"
                            >
                                {item.label}
                                <span className="hover-info">
                                    Number of Parts: {item.maxSteps}
                                </span>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    <h4>Selected Source</h4>
                    <p>Name: {source}</p>
                    <p>Number of parts: {maxSteps}</p>
                </Dropdown>
                <hr />

                <div>
                    <h5>Additional Settings</h5>
                    {pagesWithNoAdditionalSettings.includes(crtPage) && (
                        <p>No additional Settings for this page</p>
                    )}
                    {pagesWithGASettings.includes(crtPage) && (
                        <>
                            <div className="setting">
                                <p>Mutation Rate:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    defaultValue={0.1}
                                    value={mutationRate}
                                    onChange={(e) => {
                                        setMutationRate(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>Number Envs:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={1}
                                    max={16}
                                    defaultValue={1}
                                    value={nenvs}
                                    onChange={(e) => {
                                        setNEnvs(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>Population Size:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={1}
                                    max={100}
                                    defaultValue={12}
                                    value={populationSize}
                                    onChange={(e) => {
                                        setPopulationSize(Number(e.target.value));
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {crtPage === Pages.HPARAMOPT && (
                        <>
                            <div className="setting">
                                <p>Optuna BO:</p>
                                <input
                                    className="input"
                                    type="checkbox"
                                    checked={useOptunaBO}
                                    defaultChecked={true}
                                    onChange={(e) => {
                                        setUseOptunaBO(e.target.checked);
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>Use LogEI:</p>
                                <input
                                    className="input"
                                    type="checkbox"
                                    checked={useLogEI}
                                    defaultChecked={false}
                                    onChange={(e) => {
                                        setUseLogEI(e.target.checked);
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>UCB Beta:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={0}
                                    max={5}
                                    step={0.01}
                                    defaultValue={2}
                                    value={ucbBeta}
                                    onChange={(e) => {
                                        setUcbBeta(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>Default Coeff:</p>
                                <input
                                    className="input"
                                    type="checkbox"
                                    checked={defaultOneCoeff}
                                    defaultChecked={false}
                                    onChange={(e) => {
                                        setDefaultOneCoeff(e.target.checked);
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {crtPage === Pages.MCTS && (
                        <>
                            <div className="setting">
                                <p>RAVE Seq Length:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={1}
                                    max={10}
                                    step={1}
                                    defaultValue={3}
                                    value={raveSequenceLength}
                                    onChange={(e) => {
                                        setRaveSequenceLength(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="setting">
                                <p>K Equal Weight:</p>
                                <input
                                    className="input"
                                    type="number"
                                    min={1}
                                    max={50}
                                    step={1}
                                    defaultValue={25}
                                    value={kEqualWeight}
                                    onChange={(e) => {
                                        setkEqualWeight(Number(e.target.value));
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>

                <hr />

                <Button variant="success" onClick={() => applySettings()}>
                    Apply Settings ...
                </Button>
            </div>
        </div>
    );
}

function Sidebar() {
    const [showFull, setShowFull] = useState<boolean>(false);

    const handleExpand = () => setShowFull(true);
    const handleClose = () => setShowFull(false);

    const [TrajectoryDatas, setTrajectoryDatas] = useState<TrajectoryData[]>([]);

    // Load the possible trajectories on startup
    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get<TrajectoryData[]>('/sources');
            const response = await data.data;
            setTrajectoryDatas(response);
        };
        fetchData();
    }, []);

    return (
        <>
            {showFull ? (
                <SidebarOpen
                    TrajectoryDatas={TrajectoryDatas}
                    handleClose={handleClose}
                />
            ) : (
                <SidebarCollapsed handleExpand={handleExpand} />
            )}
        </>
    );
}

export default Sidebar;
