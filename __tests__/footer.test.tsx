import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer", () => {
  it("Renders link and text", () => {
    render(<Footer />);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText(/eteration case study/i)).toBeInTheDocument();
  });
});
