import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Cart from "@/components/cart";
import userEvent from "@testing-library/user-event";

const updateCartItemMock = jest.fn();
const getTotalPriceMock = jest.fn(() => 192);
const removeFromCartMock = jest.fn();
const initCartMock = jest.fn();
const mockCart = [
  {
    createdAt: "2023-07-16T07:58:05.937Z",
    name: "Honda Challenger",
    image: "https://loremflickr.com/640/480/people",
    price: "192.00",
    description:
      "Eaque nostrum alias. Adipisci nulla recusandae eius. Suscipit fugiat est. Assumenda cumque autem eveniet. Harum quidem voluptatum eum id id inventore ad facilis.\nDolores itaque eos exercitationem illum laboriosam culpa. Corporis reiciendis explicabo voluptatibus. Sed doloribus doloremque a incidunt labore illum. Quisquam molestias nemo. Quos quaerat explicabo vel modi consequuntur.\nMagni provident voluptatibus laborum minus expedita. Commodi asperiores occaecati sunt eligendi asperiores facere molestias doloribus. Vel ut incidunt ullam. Architecto illum aspernatur atque architecto. Vitae labore velit. Dicta ipsa sunt deleniti nulla sint et perspiciatis expedita reiciendis.",
    model: "Land Cruiser",
    brand: "Nissan",
    id: "16",
    cartCount: 1,
  },
];
jest.mock("@/store/cartStore", () => ({
  cartStore: jest.fn(() => ({
    cartItems: mockCart,
    updateCartItem: updateCartItemMock,
    removeFromCart: removeFromCartMock,
    getTotalPrice: getTotalPriceMock,
    initCart: initCartMock,
  })),
}));

describe("Cart", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it("Renders correctly and calls once initCart function for check localstorage", () => {
    render(<Cart />);
    expect(initCartMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/honda challenger/i)).toBeInTheDocument();
    expect(screen.getByText(/192.00/i)).toBeInTheDocument();
    expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
  });
  it("Cart should be updated when increment button clicked", async () => {
    render(<Cart />);
    await userEvent.click(screen.getByTestId("cartIncrement"));
    expect(updateCartItemMock).toHaveBeenCalled();
  });

  it("If itemCount is 1, item should be removed from cart when decrement button clicked", async () => {
    mockCart[0].cartCount = 1;
    render(<Cart />);
    await userEvent.click(screen.getByTestId("cartDecrement"));
    expect(removeFromCartMock).toHaveBeenCalled();
  });
  it("Total price should be automatically calculated with cartCount and price", () => {
    render(<Cart />);
    expect(getTotalPriceMock).toHaveBeenCalled();
    expect(screen.getByTestId("cartTotalPrice")).toHaveTextContent("192");
  });
});
