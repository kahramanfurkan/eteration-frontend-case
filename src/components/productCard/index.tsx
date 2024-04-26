import { Product } from "@/types/commonTypes";
import Image from "next/image";
import Link from "next/link";
import AddCartButton from "../addCartButton";

export default function ProductCard(product: Product) {
  return (
    <Link href={`/productDetail/${product.id}`}>
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
          <AddCartButton {...product} />
        </section>
      </div>
    </Link>
  );
}
