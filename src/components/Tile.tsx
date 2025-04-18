import '../styles/Tiles.style.css';
import { CharacterStatus } from '../types/wordType';

function getCSS(status: CharacterStatus): string {
    if (status === CharacterStatus.CORRECT) {
        return 'correct';
    } else if (status === CharacterStatus.FALSE) {
        return 'false';
    } else if (status === CharacterStatus.WRONGPOSITION) {
        return 'wrongposition';
    } else if (status === CharacterStatus.KNOWN) {
        return 'known';
    } else {
        return 'unknown';
    }
}

function getRowCss(crtRow: boolean): string {
    if (crtRow) {
        return 'crtRow';
    }
    return 'notCrtRow';
}

function Tile({
    char,
    status,
    crtRow,
}: {
    char: string;
    status: CharacterStatus;
    crtRow: boolean;
}) {
    return (
        <div className={`tile ${getCSS(status)} ${getRowCss(crtRow)}`}>
            {char.toUpperCase()}
        </div>
    );
}

export default Tile;
