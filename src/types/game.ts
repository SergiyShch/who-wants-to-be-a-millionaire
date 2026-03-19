export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  answers: AnswerOption[];
  correctAnswerIds: string[];
}

export interface GameConfig {
  rewards: string[];
  questions: Question[];
}
