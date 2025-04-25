import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import PartTile from '../components/PartTile';
import { useSettingContext } from '../context/SettingProvider';
import api from '../services/api';
import '../styles/Parts.styles.css';
import { Pages } from '../types/Pags.types';
import { PartInformations, PartSizes } from '../types/Part.types';

export default function Parts() {
    const { source, maxSteps, updatePage } = useSettingContext();
    const [sequenceCount, setSequenceCount] = useState<string>('10');
    const [partInfos, setPartInfos] = useState<PartInformations[]>([]);
    const [partSizes, setPartSizes] = useState<PartSizes>({
        width: 10,
        height: 10,
        scaleFactor: 1,
    });

    useEffect(() => {
        updatePage(Pages.PARTS);
    }, []);

    const sortingOptions: string[] = [
        'id',
        'count',
        'bbArea',
        'occupiedPixels',
        'complexity',
        'sortingValue',
    ];

    // Reload partinformations count when source changed
    useEffect(() => {
        const fetchPartInfos = async () => {
            const data = await api.get<PartInformations[]>(
                `/parts/partinfos/${source}`
            );
            const response = await data.data;
            setPartInfos(response);
        };
        fetchPartInfos();
    }, [source]);

    // Reload sizes count when source changed
    useEffect(() => {
        const fetchPartSizes = async () => {
            const data = await api.get<PartSizes>(`/parts/sizes/${source}`);
            const response = await data.data;
            setPartSizes(response);
        };
        fetchPartSizes();
    }, [source]);

    // Reload sequence count when source changed
    useEffect(() => {
        const fetchSequenceCount = async () => {
            const data = await api.get<string>(`/parts/sequencecount/${source}`);
            const response = await data.data;
            setSequenceCount(response);
        };
        fetchSequenceCount();
    }, [source]);

    function sortParts(index: string | null) {
        console.log(index);

        if (index) {
            const key = sortingOptions[Number(index)] as keyof PartInformations;
            console.log(key);

            const sortedParts = [...partInfos].sort((a, b) => {
                if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return a[key] - b[key];
                } else {
                    return 0;
                }
            });
            setPartInfos(sortedParts);
        }
    }

    return (
        <>
            <div className="parts">
                <h1>Part Information</h1>
                <hr />
                <div className="general-info">
                    <h3>General Information</h3>
                    <p>Name: {source}</p>
                    <p>Total Number of parts: {maxSteps}</p>
                    <p>
                        Part Size: {partSizes.height} mm x {partSizes.height} mm (Scale:{' '}
                        {partSizes.scaleFactor}){' '}
                    </p>
                    <p>Part Height: </p>
                    <p>Part Scale Factor: {partSizes.scaleFactor}</p>
                </div>
                <hr />

                <div className="sequence-info">
                    <h3>Sequence Information</h3>
                    <p>
                        Trajectory:{' '}
                        {JSON.stringify(
                            partInfos.reduce(
                                (accumulator: Record<number, number>, currentValue) => {
                                    accumulator[currentValue.id] = currentValue.count;
                                    return accumulator;
                                },
                                {}
                            )
                        )}
                    </p>
                    <p>Number of possible Sequences: {sequenceCount}</p>
                </div>
                <hr />

                <div className="sorting">
                    <h3>Parts</h3>
                    <div className="sorting-selection">
                        <Dropdown
                            onSelect={(index) => {
                                sortParts(index);
                            }}
                        >
                            <Dropdown.Toggle
                                className="reverse-dropdown"
                                variant="light"
                                id="dropdown-source"
                            >
                                Sort parts by ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {sortingOptions.map((item, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        eventKey={index}
                                        className="dropdown-item-with-info"
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            className="reverse-btn"
                            onClick={() => setPartInfos([...partInfos].reverse())}
                        >
                            Reverse Sorting
                        </Button>
                    </div>
                </div>
                {partInfos.length > 0 && (
                    <div className="PartInfos">
                        <div className="grid">
                            {partInfos.map((part, index) => (
                                <PartTile part={part} key={part.id} count={index + 1} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
