export type Trajectory = { [key: number]: number };

export interface TrajectoryData {
    id: number;
    label: string;
    maxSteps: number;
    parts: Trajectory;
}
