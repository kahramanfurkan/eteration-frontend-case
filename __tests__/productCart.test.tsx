import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/productCard";

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

describe("ProductCard", () => {
  it("Renders correctly with image,price,name and AddCartButton", () => {
    render(<ProductCard {...mockProduct} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/192.00/i)).toBeInTheDocument();
    expect(screen.getByText(/honda challenger/i)).toBeInTheDocument();
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });
  it("Should be link a that goes product detail page with an id", () => {
    render(<ProductCard {...mockProduct} />);
    const productCard = screen.getByTestId("productCard");
    expect(productCard.tagName.toLowerCase()).toBe("a");
    expect(productCard).toHaveAttribute("href", "/productDetail/16");
  });
});
