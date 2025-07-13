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
  nickname?: string; // Campo opzionale per la classifica
}

export interface LeaderboardEntry {
  nickname: string;
  totalPoints: number;
  completedAt: Date;
  locale: string;
}
