export interface QuizAnswer {
  itemId: string;
  categoryId: string;
  text: string;
  points: number;
}

export interface QuizResult {
  id?: string;
  answers: QuizAnswer[];
  totalPoints: number;
  locale: string;
  completedAt: Date;
}
