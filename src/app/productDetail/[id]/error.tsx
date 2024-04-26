"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  return (
    <div className="productDetail-error">
      <h1>404</h1>
      <h2>Ürün Bulunamadı</h2>
      <h5>{error.message}</h5>
      <div className="productDetail-error-button">
        <Button type="primary" onClick={() => router.push("/")}>
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}
