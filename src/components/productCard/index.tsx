"use client";

import { Product } from "@/types/commonTypes";
import Image from "next/image";
import { Button } from "antd";
import { cartStore } from "@/store/cartStore";

export default function ProductCard(product: Product) {
  const { addToCart, removeFromCart, checkInCartStatus } = cartStore();

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
        <Button
          type="primary"
          onClick={() => {
            checkInCartStatus(product)
              ? removeFromCart(product)
              : addToCart(product);
          }}
        >
          {checkInCartStatus(product) ? (
            <span className="remove">Remove from Cart</span>
          ) : (
            <span className="add">Add to Cart</span>
          )}
        </Button>
      </section>
    </div>
  );
}
