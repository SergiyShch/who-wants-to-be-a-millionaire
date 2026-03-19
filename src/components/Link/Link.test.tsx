import React from "react";
import { render, screen } from "@testing-library/react";
import Link from "@/components/Link/Link";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: React.ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  ),
}));

describe("Link", () => {
  it("renders children text", () => {
    render(<Link href="/test">Click me</Link>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders an anchor with the correct href", () => {
    render(<Link href="/game">Start</Link>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/game");
  });

  it("merges custom className", () => {
    render(
      <Link href="/test" className="extra">
        Link
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("extra");
  });

  it("forwards additional HTML attributes", () => {
    render(
      <Link href="/test" aria-label="Go home">
        Link
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Go home");
  });
});
