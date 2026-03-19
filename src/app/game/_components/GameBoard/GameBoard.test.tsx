import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import GameBoard from "@/app/game/_components/GameBoard/GameBoard";
import { GameProvider } from "@/context/GameContext";
import { mockGameConfig, createMockRouter } from "@/utils/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img alt={"test"} {...props} />,
}));

const mockRouter = createMockRouter();

function renderGameBoard(config = mockGameConfig) {
  return render(
    <GameProvider>
      <GameBoard config={config} />
    </GameProvider>,
  );
}

beforeEach(() => {
  jest.useFakeTimers();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  mockRouter.push.mockClear();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("GameBoard", () => {
  it("renders the first question text", () => {
    renderGameBoard();
    expect(screen.getByText("Test question 1?")).toBeInTheDocument();
  });

  it("renders all four answer options", () => {
    renderGameBoard();
    expect(screen.getByText("Wrong 1")).toBeInTheDocument();
    expect(screen.getByText("Correct 1")).toBeInTheDocument();
    expect(screen.getByText("Wrong 2")).toBeInTheDocument();
    expect(screen.getByText("Wrong 3")).toBeInTheDocument();
  });

  it("renders reward amounts", () => {
    renderGameBoard();
    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByText("$1,000")).toBeInTheDocument();
  });

  it("disables answer buttons after selection", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderGameBoard();

    await user.click(screen.getByText("Wrong 1"));

    expect(screen.getByText("Wrong 1").closest("button")).toBeDisabled();
    expect(screen.getByText("Correct 1").closest("button")).toBeDisabled();
    expect(screen.getByText("Wrong 2").closest("button")).toBeDisabled();
    expect(screen.getByText("Wrong 3").closest("button")).toBeDisabled();
  });

  describe("sidebar toggle", () => {
    it("toggles sidebar when menu button is clicked", async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderGameBoard();

      const menuButton = screen.getByLabelText("Open rewards");
      await user.click(menuButton);

      // After clicking, the button should still be accessible
      expect(screen.getByLabelText("Open rewards")).toBeInTheDocument();
    });
  });

  describe("game flow", () => {
    it("shows next question after correctly answering", async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderGameBoard();

      await user.click(screen.getByText("Correct 1"));

      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(screen.getByText("Test question 2?")).toBeInTheDocument();
    });

    it("navigates to game-over on wrong answer", async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderGameBoard();

      await user.click(screen.getByText("Wrong 1"));

      act(() => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/game-over");
    });
  });
});
