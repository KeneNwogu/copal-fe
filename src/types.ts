export interface Drawing {
    id: string;
    referenceId: string;
    createdAt: string; // ISO date
}

export type Reference = {
    _id?: string;
    name: string;
    completedIterations: number;
    iterations: number;
    image: string;
    startDate: string;
    frequecy: string;
}
