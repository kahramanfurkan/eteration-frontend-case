"use client";
import { Button, Drawer } from "antd";
import { useState } from "react";
import Cart from "../cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { cartStore } from "@/store/cartStore";

export default function MobileCartButton() {
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const { cartItems } = cartStore();
  return (
    <div className="mobileCartButton">
      <Button onClick={() => setMobileCartOpen(true)}>
        <ShoppingCartOutlined />
        {cartItems.length > 0 && (
          <div className="mobileCartButton-count">{cartItems.length}</div>
        )}
      </Button>
      <Drawer
        placement="right"
        title="Cart"
        open={mobileCartOpen}
        onClose={() => setMobileCartOpen(false)}
      >
        <Cart />
      </Drawer>
    </div>
  );
}
