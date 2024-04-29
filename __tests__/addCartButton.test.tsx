import "@testing-library/jest-dom";
import AddCartButton from "@/components/addCartButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let mockProduct = {
  createdAt: "2023-07-16T07:58:05.937Z",
  name: "Honda Challenger",
  image: "https://loremflickr.com/640/480/people",
  price: "192.00",
  description:
    "Eaque nostrum alias. Adipisci nulla recusandae eius. Suscipit fugiat est. Assumenda cumque autem eveniet. Harum quidem voluptatum eum id id inventore ad facilis.\nDolores itaque eos exercitationem illum laboriosam culpa. Corporis reiciendis explicabo voluptatibus. Sed doloribus doloremque a incidunt labore illum. Quisquam molestias nemo. Quos quaerat explicabo vel modi consequuntur.\nMagni provident voluptatibus laborum minus expedita. Commodi asperiores occaecati sunt eligendi asperiores facere molestias doloribus. Vel ut incidunt ullam. Architecto illum aspernatur atque architecto. Vitae labore velit. Dicta ipsa sunt deleniti nulla sint et perspiciatis expedita reiciendis.",
  model: "Land Cruiser",
  brand: "Nissan",
  id: "16",
};

const removeFromCartMock = jest.fn();
jest.mock("@/store/cartStore", () => ({
  cartStore: jest.fn(() => ({
    checkInCartStatus: jest.fn(() => true),
    addToCart: jest.fn(),
    removeFromCart: removeFromCartMock,
  })),
}));

describe("AddCartButton", () => {
  it("Renders correctly", () => {
    render(<AddCartButton {...mockProduct} />);
    expect(screen.getByText(/remove from cart/i)).toBeInTheDocument();
  });

  it("If item added Cart, button calls removeFromChart function with product on click", async () => {
    render(<AddCartButton {...mockProduct} />);
    await userEvent.click(screen.getByText(/remove from cart/i));
    expect(removeFromCartMock).toHaveBeenCalledWith(mockProduct);
  });
});
