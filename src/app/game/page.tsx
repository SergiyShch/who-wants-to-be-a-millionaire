import GameBoard from "@/app/game/_components/GameBoard/GameBoard";
import gameConfig from "@/data/gameConfig.json";
import type { GameConfig } from "@/types/game";

export default function GamePage() {
  return <GameBoard config={gameConfig as GameConfig} />;
}
