import type { GameConfig } from "@/types/game";

export const mockGameConfig: GameConfig = {
  rewards: ["$500", "$1,000"],
  questions: [
    {
      id: "q1",
      text: "Test question 1?",
      answers: [
        { id: "A", text: "Wrong 1" },
        { id: "B", text: "Correct 1" },
        { id: "C", text: "Wrong 2" },
        { id: "D", text: "Wrong 3" },
      ],
      correctAnswerIds: ["B"],
    },
    {
      id: "q2",
      text: "Test question 2?",
      answers: [
        { id: "A", text: "Correct 2" },
        { id: "B", text: "Wrong 4" },
        { id: "C", text: "Wrong 5" },
        { id: "D", text: "Wrong 6" },
      ],
      correctAnswerIds: ["A"],
    },
  ],
};

export function createMockRouter() {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  };
}

