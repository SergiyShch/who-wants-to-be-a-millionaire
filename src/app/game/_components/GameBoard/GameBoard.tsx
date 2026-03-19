"use client";

import { useState } from "react";
import Image from "next/image";
import Answer from "@/app/game/_components/Answer";
import Reward from "@/app/game/_components/Reward";
import useGame from "@/hooks/useGame";
import type { GameConfig } from "@/types/game";
import styles from "./GameBoard.module.css";

interface GameBoardProps {
  config: GameConfig;
}

export default function GameBoard({ config }: GameBoardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    currentQuestion,
    phase,
    selectAnswer,
    getAnswerVariant,
    getRewardVariant,
  } = useGame(config);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Open rewards"
        >
          {sidebarOpen ? (
            <Image src={"/close.svg"} alt="" width={24} height={24} />
          ) : (
            <Image src="/menu.svg" alt="" width={24} height={24} />
          )}
        </button>
      </div>

      <div
        className={`${styles.content} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.main}>
          <div className={styles.questionBox}>
            <h2 className={styles.question}>{currentQuestion.text}</h2>
          </div>

          <div className={styles.answers}>
            {currentQuestion.answers.map((answer) => (
              <Answer
                key={answer.id}
                label={answer.id}
                text={answer.text}
                variant={getAnswerVariant(answer.id)}
                onClick={() => selectAnswer(answer.id)}
                disabled={phase !== "playing"}
              />
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.rewards}>
            {[...config.rewards].reverse().map((reward, i) => {
              const originalIndex = config.rewards.length - 1 - i;
              return (
                <Reward
                  key={reward}
                  amount={reward}
                  variant={getRewardVariant(originalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
