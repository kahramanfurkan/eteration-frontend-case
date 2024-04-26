import Cart from "@/components/cart";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="productDetail-layout">
      <div className="productDetail-layout-productInfo">{children}</div>
      <div className="productDetail-layout-cart">
        <Cart />
      </div>
    </section>
  );
}
