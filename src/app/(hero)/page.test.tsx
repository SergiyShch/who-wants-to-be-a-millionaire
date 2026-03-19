import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(hero)/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: React.ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  ),
}));

describe("Home page", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByText("Who wants to be a millionaire?"),
    ).toBeInTheDocument();
  });

  it("renders a link to '/game' with text 'Start'", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: "Start" });
    expect(link).toHaveAttribute("href", "/game");
  });
});
