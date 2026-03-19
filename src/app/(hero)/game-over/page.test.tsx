import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { GameProvider, useGameContext } from "@/context/GameContext";
import GameOverPage from "@/app/(hero)/game-over/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: React.ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  ),
}));

describe("GameOverPage", () => {
  it("renders 'Total score:' text", () => {
    render(
      <GameProvider>
        <GameOverPage />
      </GameProvider>,
    );
    expect(screen.getByText("Total score:")).toBeInTheDocument();
  });

  it("renders the default earned amount", () => {
    render(
      <GameProvider>
        <GameOverPage />
      </GameProvider>,
    );
    expect(screen.getByText(/\$0 earned/)).toBeInTheDocument();
  });

  it("renders a 'Try again' link pointing to '/game'", () => {
    render(
      <GameProvider>
        <GameOverPage />
      </GameProvider>,
    );
    const link = screen.getByRole("link", { name: "Try again" });
    expect(link).toHaveAttribute("href", "/game");
  });

  it("renders a custom earned amount from context", () => {
    function SetEarned({ amount }: { amount: string }) {
      const { setEarned } = useGameContext();
      useEffect(() => {
        setEarned(amount);
      }, [amount, setEarned]);
      return null;
    }

    render(
      <GameProvider>
        <SetEarned amount="$32,000" />
        <GameOverPage />
      </GameProvider>,
    );
    expect(screen.getByText(/\$32,000 earned/)).toBeInTheDocument();
  });
});
