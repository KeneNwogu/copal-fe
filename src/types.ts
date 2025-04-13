export interface CategoryScores {
    proportions: number;
    anatomy: number;
    perspective: number;
    shading: number;
    lineQuality: number;
    composition: number;
    likeness: number;
    _id: any;
}

export interface CategoryFeedback {
    proportions: string;
    anatomy: string;
    perspective: string;
    shading: string;
    lineQuality: string;
    composition: string;
    likeness: string;
    _id: string;
}

export interface Drawing {
    _id?: string;
    day: string; // ISO date
    reference: string;
    user: string;
    __v?: number;
    overallScore: number;
    improvementTips?: string[];
    categoryScores: CategoryScores;
    categoryFeedback: CategoryFeedback;
    progressSummary: string | null;
    image: string;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
}

export type Reference = {
    _id?: string;
    name: string;
    completedIterations: number;
    iterations: number;
    image: string;
    startDate: string;
    frequency: string;
}
