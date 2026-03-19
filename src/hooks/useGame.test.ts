import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import useGame from "@/hooks/useGame";
import { GameProvider } from "@/context/GameContext";
import { mockGameConfig, createMockRouter } from "@/utils/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = createMockRouter();

beforeEach(() => {
  jest.useFakeTimers();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  mockRouter.push.mockClear();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

function renderUseGame(config = mockGameConfig) {
  return renderHook(() => useGame(config), { wrapper: GameProvider });
}

describe("useGame", () => {
  describe("initial state", () => {
    it("returns the first question from config", () => {
      const { result } = renderUseGame();
      expect(result.current.currentQuestion.id).toBe("q1");
      expect(result.current.currentQuestion.text).toBe("Test question 1?");
    });

    it("starts with currentQuestionIndex 0", () => {
      const { result } = renderUseGame();
      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it("starts with phase 'playing'", () => {
      const { result } = renderUseGame();
      expect(result.current.phase).toBe("playing");
    });
  });

  describe("selectAnswer", () => {
    it("ignores calls when phase is not 'playing'", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      expect(result.current.phase).toBe("selected");

      act(() => {
        result.current.selectAnswer("A");
      });

      expect(result.current.getAnswerVariant("B")).toBe("selected");
    });

    it("transitions to 'selected' phase immediately after call", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      expect(result.current.phase).toBe("selected");
    });

    it("transitions to 'correct' phase after 1000ms when answer is correct", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.phase).toBe("correct");
    });

    it("transitions to 'wrong' phase after 1000ms when answer is wrong", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.phase).toBe("wrong");
    });

    it("advances to next question after 2500ms on correct answer", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(result.current.currentQuestionIndex).toBe(1);
      expect(result.current.phase).toBe("playing");
      expect(result.current.currentQuestion.id).toBe("q2");
    });

    it("calls router.push('/game-over') on wrong answer to first question", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });

      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/game-over");
    });

    it("earns previous reward on wrong answer to second question", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/game-over");
    });

    it("navigates to game-over on answering last question correctly", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      act(() => {
        result.current.selectAnswer("A");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/game-over");
    });
  });

  describe("getAnswerVariant", () => {
    it("returns 'inactive' for all answers in 'playing' phase", () => {
      const { result } = renderUseGame();

      expect(result.current.getAnswerVariant("A")).toBe("inactive");
      expect(result.current.getAnswerVariant("B")).toBe("inactive");
      expect(result.current.getAnswerVariant("C")).toBe("inactive");
      expect(result.current.getAnswerVariant("D")).toBe("inactive");
    });

    it("returns 'selected' for the selected answer in 'selected' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      expect(result.current.getAnswerVariant("B")).toBe("selected");
    });

    it("returns 'inactive' for non-selected answers in 'selected' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });

      expect(result.current.getAnswerVariant("A")).toBe("inactive");
      expect(result.current.getAnswerVariant("C")).toBe("inactive");
    });

    it("returns 'correct' for the selected answer in 'correct' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.phase).toBe("correct");
      expect(result.current.getAnswerVariant("B")).toBe("correct");
    });

    it("returns 'wrong' for the selected answer in 'wrong' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.phase).toBe("wrong");
      expect(result.current.getAnswerVariant("A")).toBe("wrong");
    });

    it("returns 'correct' for the correct answer in 'wrong' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.getAnswerVariant("B")).toBe("correct");
    });

    it("returns 'inactive' for non-selected non-correct answers in 'wrong' phase", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.getAnswerVariant("C")).toBe("inactive");
      expect(result.current.getAnswerVariant("D")).toBe("inactive");
    });
  });

  describe("getRewardVariant", () => {
    it("returns 'default' for all rewards at start", () => {
      const { result } = renderUseGame();

      expect(result.current.getRewardVariant(0)).toBe("default");
      expect(result.current.getRewardVariant(1)).toBe("default");
    });

    it("returns 'guaranteed' for reward at index === currentQuestionIndex - 1", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(result.current.currentQuestionIndex).toBe(1);
      expect(result.current.getRewardVariant(0)).toBe("guaranteed");
    });

    it("returns 'default' for reward at index >= currentQuestionIndex", () => {
      const { result } = renderUseGame();

      act(() => {
        result.current.selectAnswer("B");
      });
      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(result.current.getRewardVariant(1)).toBe("default");
    });
  });

  describe("timer cleanup", () => {
    it("clears pending timers on unmount", () => {
      const { result, unmount } = renderUseGame();

      act(() => {
        result.current.selectAnswer("A");
      });

      unmount();

      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
