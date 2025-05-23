export interface QuizAnswer {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
  correctAnswer: string;
}
