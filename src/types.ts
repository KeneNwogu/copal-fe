export interface Drawing {
    id: string;
    referenceId: string;
    createdAt: string; // ISO date
}

export interface Reference {
    id: string;
    title: string;
    iterationTarget: number;
}
