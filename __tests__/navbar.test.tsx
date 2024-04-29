import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/navbar";

//next navigation mocklamazsak error atıyor
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => jest.fn(),
}));

describe("Navbar", () => {
  it("Renders logo,searchBox and profile button", () => {
    render(<Navbar />);
    const Logo = screen.getByText(/eteration/i);
    expect(Logo).toBeInTheDocument();
    expect(Logo).toHaveAttribute("href", "/");

    const SearchBox = screen.getByTestId("searchBox");
    expect(SearchBox).toBeInTheDocument();

    const ProfileButton = screen.getByTestId("userInfo");
    expect(ProfileButton).toBeInTheDocument();
  });

  it("Searchbox updates searchValue state", async () => {
    render(<Navbar />);
    const SearchBox = screen.getByTestId("searchBox");
    await userEvent.type(SearchBox, "Tesla");
    expect(SearchBox).toHaveValue("Tesla");
  });
});
