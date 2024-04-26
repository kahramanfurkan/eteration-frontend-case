//import { Product } from "@/types/commonTypes";
import Image from "next/image";
import { Button } from "antd";

export type Product = {
  brand: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  model: string;
  name: string;
  price: string;
};

export default function ProductCard(product: Product) {
  return (
    <div className="productCard">
      <Image
        width={160}
        height={150}
        className="productCard-image"
        src={product.image}
        alt={product.name}
        priority
      />
      <section className="productCard-price">{product.price} ₺</section>
      <section className="productCard-name">{product.name}</section>
      <section className="productCard-button">
        <Button type="primary">Add to Cart</Button>
      </section>
    </div>
  );
}
