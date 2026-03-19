import gameConfig from "@/data/gameConfig.json";
import type { GameConfig } from "@/types/game";

describe("gameConfig", () => {
  const config: GameConfig = gameConfig;

  describe("rewards", () => {
    it("has at least one reward", () => {
      expect(config.rewards.length).toBeGreaterThanOrEqual(1);
    });

    it("rewards count matches questions count", () => {
      expect(config.rewards).toHaveLength(config.questions.length);
    });

    it("each reward is a non-empty string", () => {
      config.rewards.forEach((reward) => {
        expect(reward.length).toBeGreaterThan(0);
      });
    });

    it("each reward matches the dollar format ($X,XXX)", () => {
      config.rewards.forEach((reward) => {
        expect(reward).toMatch(/^\$[\d,]+$/);
      });
    });

    it("rewards are ordered from lowest to highest", () => {
      const amounts = config.rewards.map((r) =>
        Number(r.replace(/[$,]/g, "")),
      );
      for (let i = 1; i < amounts.length; i++) {
        expect(amounts[i]).toBeGreaterThan(amounts[i - 1]);
      }
    });
  });

  describe("questions", () => {
    it("has at least one question", () => {
      expect(config.questions.length).toBeGreaterThanOrEqual(1);
    });

    it("all question ids are unique", () => {
      const ids = config.questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    describe("each question", () => {
      config.questions.forEach((question, index) => {
        describe(`question ${index + 1} (${question.id})`, () => {
          it("has a non-empty id", () => {
            expect(question.id.length).toBeGreaterThan(0);
          });

          it("has a non-empty text", () => {
            expect(question.text.length).toBeGreaterThan(0);
          });

          it("has at least 2 answer options", () => {
            expect(question.answers.length).toBeGreaterThanOrEqual(2);
          });

          it("has at least one correct answer", () => {
            expect(question.correctAnswerIds.length).toBeGreaterThanOrEqual(1);
          });

          it("each answer has a non-empty id and text", () => {
            question.answers.forEach((answer) => {
              expect(answer.id.length).toBeGreaterThan(0);
              expect(answer.text.length).toBeGreaterThan(0);
            });
          });

          it("each answer id is a single capital letter", () => {
            question.answers.forEach((answer) => {
              expect(answer.id).toMatch(/^[A-Z]$/);
            });
          });

          it("all answer ids are unique", () => {
            const answerIds = question.answers.map((a) => a.id);
            expect(new Set(answerIds).size).toBe(answerIds.length);
          });

          it("all correctAnswerIds reference valid answer ids", () => {
            const answerIds = question.answers.map((a) => a.id);
            question.correctAnswerIds.forEach((correctId) => {
              expect(answerIds).toContain(correctId);
            });
          });
        });
      });
    });
  });
});