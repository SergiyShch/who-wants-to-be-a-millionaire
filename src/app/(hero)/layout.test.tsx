import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import HeroLayout from "@/app/(hero)/layout";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img alt={"test"} {...props} />,
  getImageProps: jest.fn((config: { src: string; alt: string }) => ({
    props: {
      src: config.src,
      srcSet: config.src,
      alt: config.alt,
    },
  })),
}));

describe("HeroLayout", () => {
  it("renders children", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(
      <HeroLayout>
        <div>test child</div>
      </HeroLayout>,
    );
    expect(screen.getByText("test child")).toBeInTheDocument();
  });

  it("renders a main element", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(
      <HeroLayout>
        <div>content</div>
      </HeroLayout>,
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("applies gradient class only when pathname is '/'", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(
      <HeroLayout>
        <div>content</div>
      </HeroLayout>,
    );
    const main = screen.getByRole("main");
    expect(main.className).toContain("gradient");
  });

  it("does not apply gradient class when pathname is '/game-over'", () => {
    (usePathname as jest.Mock).mockReturnValue("/game-over");
    render(
      <HeroLayout>
        <div>content</div>
      </HeroLayout>,
    );
    const main = screen.getByRole("main");
    expect(main.className).not.toContain("gradient");
  });
});
