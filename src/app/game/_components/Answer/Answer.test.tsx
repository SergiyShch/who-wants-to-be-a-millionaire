import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Answer from "@/app/game/_components/Answer/Answer";

describe("Answer", () => {
  it("renders label and text", () => {
    render(<Answer label="A" text="Mercury" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("Mercury")).toBeInTheDocument();
  });

  it("renders as a button with type='button'", () => {
    render(<Answer label="A" text="Mercury" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Answer label="A" text="Mercury" onClick={handleClick} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Answer label="A" text="Mercury" onClick={handleClick} disabled />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Answer label="A" text="Mercury" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards additional button HTML attributes", () => {
    render(<Answer label="A" text="Mercury" aria-label="Select Mercury" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Select Mercury",
    );
  });
});
