import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { GameProvider, useGameContext } from "@/context/GameContext";

describe("GameContext", () => {
  describe("GameProvider", () => {
    it("renders children", () => {
      render(
        <GameProvider>
          <div>child content</div>
        </GameProvider>,
      );
      expect(screen.getByText("child content")).toBeInTheDocument();
    });

    it("provides initial earned value of '$0'", () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: GameProvider,
      });
      expect(result.current.earned).toBe("$0");
    });

    it("updates earned value when setEarned is called", () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: GameProvider,
      });

      act(() => {
        result.current.setEarned("$1,000");
      });

      expect(result.current.earned).toBe("$1,000");
    });
  });

  describe("useGameContext", () => {
    it("throws error when used outside GameProvider", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useGameContext());
      }).toThrow("useGameContext must be used within a GameProvider");

      consoleSpy.mockRestore();
    });
  });
});
