"use client";
import { cartStore } from "@/store/cartStore";
import { Product } from "@/types/commonTypes";
import { Button } from "antd";
import { useEffect } from "react";
export default function Cart() {
  const { cartItems, updateCartItem, removeFromCart, getTotalPrice, initCart } =
    cartStore();

  useEffect(() => {
    initCart();
  }, []);

  const increaseCartCount = (cartItem: Product) => {
    if (!cartItem.cartCount) {
      cartItem.cartCount = 1;
      updateCartItem(cartItem);
      return;
    }
    cartItem.cartCount++;
    updateCartItem(cartItem);
  };
  const decreaseCartCount = (cartItem: Product) => {
    if (!cartItem.cartCount || cartItem.cartCount === 1) {
      removeFromCart(cartItem);
      return;
    }
    cartItem.cartCount--;
    updateCartItem(cartItem);
  };

  return (
    <section className="cart">
      <span className="cart-title">Cart</span>
      <div className="cart-wrapper">
        {cartItems.map((cartItem: Product) => (
          <div key={cartItem.id} className="cartItem">
            <section className="cartItem-productInfo">
              <span className="cartItem-productInfo-name">{cartItem.name}</span>
              <span className="cartItem-productInfo-price">
                {cartItem.price} ₺
              </span>
            </section>
            <section className="cartItem-updateButtons">
              <Button
                onClick={() => decreaseCartCount(cartItem)}
                data-testid="cartDecrement"
              >
                -
              </Button>
              <span
                className="cartItem-updateButtons-cartCount"
                data-testid="cartCount"
              >
                {cartItem?.cartCount}
              </span>
              <Button
                onClick={() => increaseCartCount(cartItem)}
                data-testid="cartIncrement"
              >
                +
              </Button>
            </section>
          </div>
        ))}
        {cartItems.length < 1 && (
          <span className="emptyCart">Sepetiniz boş görünüyor.</span>
        )}
      </div>
      <span className="cart-title">Checkout</span>
      <div className="cart-wrapper">
        <div className="checkOut">
          <div className="checkOut-total">
            <span className="checkOut-total-title">Total Price: </span>
            <span className="checkOut-total-price" data-testid="cartTotalPrice">
              {getTotalPrice()} ₺
            </span>
          </div>

          <div className="checkOut-button">
            <Button type="primary">Checkout</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
