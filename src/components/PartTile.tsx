import '../styles/PartTile.styles.css';
import { PartInformations } from '../types/Part.types';

export default function PartTile({
    part,
    count,
}: {
    part: PartInformations;
    count: number;
}) {
    return (
        <div className="tile">
            <div>
                <h3>
                    {count}.Part {part.id}
                </h3>
                <p>Count: {part.count}</p>
            </div>
            <div className="part-image-wrapper">
                <img className="part-image" src={part.url} alt="Part img" />
            </div>
            <div>
                <h4>Geometric Informations</h4>
                <p>BB Area: {part.bbArea}</p>
                <p>Occupied Pixels: {part.occupiedPixels}</p>
                <p>Complexity: {part.complexity}</p>
                <p>Sorting Value: {part.sortingValue}</p>
            </div>
        </div>
    );
}
