"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/context/GameContext";
import type { GameConfig } from "@/types/game";

type GamePhase = "playing" | "selected" | "correct" | "wrong";

interface GameState {
  currentQuestionIndex: number;
  selectedAnswerId: string | null;
  phase: GamePhase;
}

export default function useGame(config: GameConfig) {
  const router = useRouter();
  const { setEarned } = useGameContext();
  const [state, setState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedAnswerId: null,
    phase: "playing",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = config.questions[state.currentQuestionIndex];

  const selectAnswer = useCallback(
    (answerId: string) => {
      if (state.phase !== "playing") return;

      const isCorrect = currentQuestion.correctAnswerIds.includes(answerId);

      setState((prev) => ({
        ...prev,
        selectedAnswerId: answerId,
        phase: "selected",
      }));

      timerRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          phase: isCorrect ? "correct" : "wrong",
        }));

        timerRef.current = setTimeout(() => {
          if (isCorrect) {
            const isLastQuestion =
              state.currentQuestionIndex === config.questions.length - 1;

            if (isLastQuestion) {
              setEarned(config.rewards[state.currentQuestionIndex]);
              router.push("/game-over");
            } else {
              setState({
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedAnswerId: null,
                phase: "playing",
              });
            }
          } else {
            const earnedIndex = state.currentQuestionIndex - 1;
            setEarned(earnedIndex >= 0 ? config.rewards[earnedIndex] : "$0");
            router.push("/game-over");
          }
        }, 1500);
      }, 1000);
    },
    [
      state.phase,
      state.currentQuestionIndex,
      currentQuestion,
      config,
      router,
      setEarned,
    ],
  );

  const getAnswerVariant = useCallback(
    (answerId: string) => {
      if (state.phase === "playing" || state.selectedAnswerId === null) {
        return "inactive" as const;
      }

      if (state.phase === "selected") {
        return answerId === state.selectedAnswerId
          ? ("selected" as const)
          : ("inactive" as const);
      }

      if (state.phase === "correct") {
        return answerId === state.selectedAnswerId
          ? ("correct" as const)
          : ("inactive" as const);
      }

      if (answerId === state.selectedAnswerId) {
        return "wrong" as const;
      }

      if (currentQuestion.correctAnswerIds.includes(answerId)) {
        return "correct" as const;
      }

      return "inactive" as const;
    },
    [state.phase, state.selectedAnswerId, currentQuestion],
  );

  const getRewardVariant = useCallback(
    (index: number) => {
      if (index === state.currentQuestionIndex - 1) {
        return "guaranteed" as const;
      }

      if (index < state.currentQuestionIndex) {
        return "passed" as const;
      }

      return "default" as const;
    },
    [state.currentQuestionIndex],
  );

  // timers clean up when component unmounts
  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    phase: state.phase,
    selectAnswer,
    getAnswerVariant,
    getRewardVariant,
  };
}
