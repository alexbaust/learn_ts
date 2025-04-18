import '../styles/Row.styles.css';
import { CharacterStatus } from '../types/wordType';
import Tile from './Tile';

function Row({
    chars,
    status,
    crtRow,
}: {
    chars: string;
    status: CharacterStatus[];
    crtRow: boolean;
}) {
    return (
        <div className="row">
            {chars.split('').map((char, index) => (
                <Tile char={char} status={status[index]} crtRow={crtRow} key={index} />
            ))}
        </div>
    );
}

export default Row;
