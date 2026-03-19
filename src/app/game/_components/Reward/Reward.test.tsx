import { render, screen } from "@testing-library/react";
import Reward from "@/app/game/_components/Reward/Reward";

describe("Reward", () => {
  it("renders the amount text", () => {
    render(<Reward amount="$500" />);
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("renders as a div, not a button", () => {
    render(<Reward amount="$500" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders without crashing with all variant values", () => {
    const variants = ["default", "passed", "guaranteed"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Reward amount="$1,000" variant={variant} />);
      expect(screen.getByText("$1,000")).toBeInTheDocument();
      unmount();
    });
  });
});
